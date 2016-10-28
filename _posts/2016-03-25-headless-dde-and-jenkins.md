---
layout: post
type: post
title: "Headless DDE Builds With Jenkins CI"
description: "automation is king"
category: xpages
series: build-automation
tags: [xpages, dde, jenkins]
modified: 2016-03-25
comments: true
share: true
toc: true
---

{% include series.html %}
{% include toc.html %}
### Intro
[Last time]({{ site.url }}/xpages/xsltproc-and-headless-dde/) I described a major building block which has made my efforts to have a build automation machine (in the process of being turned into a vm) for  my largest application. This includes a number of advantages, from being able to produce a copy of the application design at a given commit/tag/version from its git repository on demand or on schedule. It also means that the many possibilities when it comes to being able to hook in the creation of a current javadoc, unit testing, and more. The sky is the limit and I'm setting down some of what I do with my current headless dde build task from my Jenkins CI instance.

Please note, I'm not much in favor of repeating myself or others' works. While I wrote a fair amount about some of the basics of task runner use, much of which can be found elsewhere, I did so to build a platform for the uninitiated, as my focus was always on the end goal of how it hooks into my development workflow; the workflow of a  developer with Domino/XPages, that's the unique aspect. When it comes to this post, I won't be talking about the details of what to do to create a Jenkins CI instance or perform some of the already well established requirements, but rather I'm going to assume that:

* you know what [headless designer](https://www-10.lotus.com/ldd/ddwiki.nsf/dx/Headless_Designer_Wiki) (dde) means
* you're familiar with what [Jenkins CI](https://jenkins.io/) is
* you've read a combination of [Cameron Gregor's](http://camerongregor.com/2014/08/09/build-system-for-xpages-and-osgi-plugins/) blog post [Martin Pradny's](http://www.pradny.com/2014/03/build-xpages-app-from-git-with-jenkins.html) post on the subject; I recommend both
* you know that [automating this stuff](https://www.youtube.com/watch?v=6BIDNfOrnAY) is possibly one of the coolest things ever

### What We Need
* Windows OS w/
  * Domino Designer installed for headless DDE builds
  * Notes SSO (so no pw prompt; this worked for me, others have recommended a Notes ID w/ no password, use your discretion or a friendly aligned admin's discretion)
  * `DESIGNER_AUTO_ENABLED=true` set in `notes.ini`
  * similar/same Designer and Server environments
      * at same FP/version as server environments
      * any dependent OSGi plugins for DDE installed
      * any dependent JARs from server/apps installed to `<installDir>/jvm/lib/ext/`
  * (optional) recommended: Notes Client Killer installed
* Jenkins CI installed as an "app"
  * to run as logged in user (does not happen if done as a Windows service, sadly; gets a little fiddly)
  * configured to allow interacting with the desktop (may only apply to Jenkins as a service, but it's set up in my environment)
  * task will contain (by my implementation) 4 steps (optional 5th)
    1. (optional*, unless large NSF w/ build issues) the xslt processing assets (from [my last blog post]({{ site.url }}/xpages/xsltproc-and-headless-dde/)) to ensure a clean ODP import by headless DDE
    2. (optional) Notes Client Killer (helps, in case Jenkins task +/- headless DDE gets hung; at a minimum, have a separate Jenkins task to call the client killer)
    3. PowerShell (installed for Windows, also a PS script, below) to execute the headless DDE build
    4. scan the `HEADLESS0.log` for whether to mark the task a failure (Jenkins had mis-reported "SUCCESS" when the headless DDE call failed to build a usable NSF)
    5. (optional) [SonarQube](http://www.sonarqube.org/) [analysis](http://docs.sonarqube.org/display/SONAR/Analyzing+Source+Code) ([previously covered](https://edm00se.io/self-promotion/docker-plus-sonarqube))
* git/hg/scm repository access to the project(s) in question, at least visible to the Jenkins instance
* (optional) a SonarQube (server) environment set up, scanner installed and config'd correctly for shell use w/ Jenkins
* (optional) recommended: Color ANSI plugin (to make better console output for Jenkins)

Go ahead, I'll wait while you set it all up (yes, I'm full of snarcasm).

### Steps In A Headless Designer Task
The below are different "build" scripts (some as BASH-like/compatible, one in particular is PowerShell, with the Jenkins PowerShell plugin). Together, they make up a larger "Jenkins task", which I started as a "Freestyle project" and set up the git repository association for. In theory, I could drive every release to the master branch into a build, but currently, I've added a build parameter, so that I am prompted for either a git commit or tag (in my case, version numbers) of which to build. Otherwise, things like setting up email notifications, etc. are all up to you.

#### 1. Metadata Filtering
If you're unlucky enough to have a large enough Domino application to not want to use Build Automatically in DDE and not be able to benefit from the use of swiper, you'll want to filter your metadata before the headless designer import, as with my experience, dde will choke and create a useless file. This script ensures a fetch from the git remote (origin) and pulls down the specified Jenkins build parameter (`$TAGNAME`) from which to build. It then checks for a `package.json` and `Gruntfile.js` in the project, copying in a boilerplate copy (in [yesterday's blog post]({{ site.url }}/xpages/xsltproc-and-headless-dde/)) and updates the relative ODP (On Disk Project) path, as needed. The boilerplate `Gruntfile.js` assumes an ODP directory of `ODP/`, so the script here is changing that to `NSF/`. Lastly, it runs the install of the npm dependencies; not much, mostly just grunt and a couple grunt plugins.

```sh
# fetch tags, then checkout the specified tag, by Jenkins param env var
git fetch
git checkout $TAGNAME

# check for whether package.json and Gruntfile.js exist, if not, copy them in
if [[ ! -f package.json ]]; then
	echo "package.json does not exist, copying one in"
	cp /c/xsltproc4domino/boilerplate_package.json ./package.json
fi
if [[ ! -f Gruntfile.js ]]; then
	echo "Gruntfile.js does not exist, copying one in"
	cp /c/xsltproc4domino/boilerplate_Gruntfile.js ./Gruntfile.js
fi

# if you need to change the ODP path (e.g.- NSF instead of ODP), do so
sed -i -e 's/\.\/ODP\//\.\/NSF\//g' ./Gruntfile.js

# run npm install and Grunt, for the appropriate xsltproc transform
npm install
grunt
```

#### 2. Killing Previous Notes Processes
This is debatable, but after having no (visually noticeable) notes process running and not seeing any successful builds, I added this to the Jenkins task. I keep a separate "admin" task which is just the [notes client killer](http://www.xpagedeveloper.com/software/client-killer), for emergencies. It's worth noting, the Jenkins instance shouldn't attempt more than one headless dde build at a time.

`"C:\Program Files (x86)\XPageDeveloper\NotesClientKiller\Notes Client Killer.exe" -forceandclean`

#### 3. Headless DDE
Time to build. This is an adapted version of the PowerShell script from Egor Margineanu, which I found out about from Cameron's blog post. Up front, I'm defining the project name, then the build name (which drives off the build number and project name).

```powershell
$projName="myProj"
$buildTag=$env:TAGNAME
$buildTag = $buildTag -replace '\.',''
# avoid use of hyphens, underscores, or periods/decimals, they shouldn't matter but seem to get in the way
$buildNum=$env:BUILD_NUMBER
$buildName=$projName+'BuildNum'+$buildNum
$workspace=$env:WORKSPACE
Clear-Content HEADLESS0.log
$args = '-RPARAMS -console -vmargs -Dcom.ibm.designer.cmd="true,true,'+$buildName+'.nsf,importandbuild,'+$workspace+'\NSF\.project,'+$buildName+'.nsf"'
Write-Host $args
$p = Start-Process designer -ArgumentList $args
$target = 'notes2'
$process = Get-Process | Where-Object {$_.ProcessName -eq $target}
do {
    Get-Content headless0.log -Wait | Select-String "closing designer" | %{ write-host Found $_; break}
} until($process.HasExited)
```

#### 4. Improving Build Status
I had a few builds get flagged by Jenkins as successful, even though they failed to generate anything worthwhile. To compensate, this script checks for the `HEADLESSS0.log` and checks its contents for "job error", to see if dde is reporting out a failure; it flags the build accordingly.

```sh
cd "$WORKSPACE"

if [[ -f "HEADLESS0.log" ]]; then
   echo "'HEADLESS0.log' Exists"
   if grep -qi "job error" $FILE; then
      # code if found
      exit 1
  else
      # code if not found
      exit 0
  fi
else
   echo "'HEADLESS0.log' Does Not Exist"
   exit 1
fi
```

#### 5. (Optional) Send to SonarQube
Let's face it, I really like SonarQube. It may not amount to much more than an automated peer review, but that's good and insightful stuff. You can skip this, obviously; mine's (currently) pushing to a docker image on the same PC, [like I demonstrated previously]({{ site.url }}/self-promotion/docker-plus-sonarqube/).

```sh
if [[ ! -f "sonar-project.properties" ]]; then
	echo "sonar.projectKey=my:proj" > sonar-project.properties
	echo "sonar.projectName=myProj" >> sonar-project.properties
	echo "sonar.projectVersion=myProj-$TAGNAME-BuildNum$BUILD_NUMBER" >> sonar-project.properties
	echo "sonar.sources=ODP\\Code\\Java\\com" >> sonar-project.properties
	echo "sonar.sourceEncoding=UTF-8" >> sonar-project.properties
fi
sonar-runner
```

### Summary
All in all, this is a big topic, but full of incredibly useful potential for those of us looking to "level up" our development workflows. Automation is king, in IT much in the same way that my accounting professor would exclaim "cash is king"; in my opinion. The more we can automate, the more we can focus on _actual development_.
