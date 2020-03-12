---
title: 'XSLTProc in the Buff'
description: 'a modified dora/swiper process for headless dde nsf builds'
date: 2016-03-24
published: true
tags: ['xpages', 'dde', 'xsl', 'grunt', 'jenkins']
canonical_url: false
category: xpages
permalink: /xpages/xsltproc-and-headless-dde/
toc: true
---

<!-- {% include series.html %} -->

### Intro

The [DORA project](https://github.com/camac/dora) (Domino On-disk Repository Assistant) from Cameron Gregor has gone through a couple incarnations, originally as DORA, then again as a plugin to Domino Designer (DDE), called [Swiper](https://openntf.org/main.nsf/project.xsp?r=project/Swiper). These are both great projects, benefitting the community in that our (git for dora) scm repositories (for swiper) are much tidier and there are less issues with the overhead of the metadata/etc. files (particularly with swiper).

#### What It Does

DORA (and Swiper) both accomplish the same filtering/stripping of metadata content which is unnecessary for a Domino On Disk Project (ODP), at least when it comes to source control integration (git or mercurial, etc.) and the importing of an ODP to create an NSF.

Stripping out the overhead of the unnecessary metadata means that our scm commits (generally git) can be far more ["atomic"](https://en.wikipedia.org/wiki/Atomic_commit) in nature, making them more meaningful and to-the-point. If you've had to sift through commit history and keep reading through lines of `<last-updated...` and the like, you know the pain all too well.

#### My Use Case

In large Domino applications, specifically the largest one I maintain at the day job, the biggest hurdle to my being able to complete the automation of the ["headless designer build" of an NSF](https://www-10.lotus.com/ldd/ddwiki.nsf/dx/Headless_Designer_Wiki) has been in relation to the fact that the app has an incredibly large number of design elements and, in most builds (virtually every instance), the build will fail to fully import the project to the NSF during the initialization, making it fail to initialize properly, and results a useless NSF with none of the design elements. The most damning thing was that performing the same steps of importing the ODP and creating a new NSF from the ODP were entirely successful, making my first few goes at headless DDE builds seem fruitless, for my efforts.

After running some tests with ingesting a copy of my app's git repo into an isolated environment, I was able to get nearly every design element processed by Swiper using a combination of Build Automatically (which I _do not_ use for my day job, on account of not wanting to wait for a minor eternity for Built Automatically to do it's thing, whenever I open the correspondingly gargantuan NSF) and manually applying the filter. Running the headless build task after my git repo's ODP contents had been processed meant my builds started succeeding, every single one.

#### Swiper

Swiper is great, but it's biggest limitation is the fact that it hooks into the Build Automatically task for DDE (from my perspective). Since I don't use this (currently, until I find a better way) at the day job, it's my limiting factor. What makes swiper great is that it limits this output, before it even hits the ODP, making the scm/git integration seamless; this is what I believe should be a part of DDE's integrated process, in my opinion, as part of the use of source control implies that any imported ODP is trusted by the signer/creator/you and that things like last updated properties on design elements are irrelevant.

### Enter: Automation

Wanting to automate my builds (nightly, per release to the `master` branch, on-demand, however I configure my [Jenkins CI](https://jenkins-ci.org/) instance), this meant I wanted the ability to run the task of filtering the XML (which DXL is, [with the binary option disabled](https://edm00se.io/xpages/getting-started-with-it-all/#source-control-with-domino-designer)) as an on-demand (build pipeline invoked), "one-off" process. This would ideally be invoked from the CLI, to be _just another task_ in the <s>shell/PowerShell</s> script for my Jenkins CI instance.

#### Read and Understand

Something Cameron did a great job with, looking back at DORA, was to embrace a documentation of the moving parts. The [`dora.pl`](https://github.com/camac/dora/blob/master/dora.pl) script was where I started, which is where I should have _ended_, in retrospect. In the Read Me for the project, there's a section called ["Manual Installation of Dora"](https://github.com/camac/dora#manual-installation-of-dora), which outlines the specifics of what the install script does during the setup for a project.

#### What Setup Does for a Git Repo

As best as I can tell, it achieves the following few things:

  - globally installs (if it isn't there already) scripts in the user's home directory (`~/bin`) and the XSL files that will filter the assets (`~/dora`) and adds the script to the user's PATH (for cli access)
  - installs into the local git repo (`.git/config`) a definition of a filter, called "dxlmetadata" (with tasks of clean and smudge) and sets it as required
  - adds the XSL files to `xsl/`
  - sets the [file associations in the `.gitattributes`](https://github.com/camac/dora/blob/master/dora.pl#L132-L159) file to enforce the files to be processed to be handled as text, filtered by "dxlmetadata", and use a consistent LF for the end of line (and consistency during the file's subsequent tracking in git)
  - also [tells `.gitignore` to not track](https://github.com/camac/dora/blob/master/dora.pl#L121-L130) the files or changes in the `xsl` path, or some of the other files associated with some settings and whatnot

### To Replicate The Results

I need to filter the correct files using the appropriate XSL (the `DXLClean.xsl` being the most relevant here, since I don't need to do anything other than run it each time before a headless build, no commiting back to the git repo form a build pipeline standpoint).

#### Proof of Concept

DORA installs the `xsltproc` binary, which is necessary on Windows; on *nix (based) OSes, most come with a copy of it. I installed dora then, in a freshly cloned copy of my app's git repository, I ran the following command (adapted from Cameron's [DORA ReadMe](https://github.com/camac/dora#testing-an-xsl-transformation-stylesheet)):

```sh
xsltproc ~/dora/DXLClean.xsl ODP/XPages/SomePage.xsp.metadata
```

This prints the output of the processed file to the console. The command flag for outputting to a specific file is `-o <outputFileName>`. Now that I know I can set my build environment for consistency, all I need to do is apply the filter to the appropriate files, performing an in-place save.

### Expanding

I should _probably_ just create a shell script to perform the [bootstraping](https://en.wikipedia.org/wiki/Bootstrapping) needed here; but since I'm lazy and have already added my scripts to my personal [dotfiles repository](https://dotfiles.github.io/), I'm unlikely to do so at this point, as it won't benefit me (and is a somewhat trivial script to write at this point).

In reality, I've gone with what I know and created a task runner based solution, using grunt. The benefit of writing a `bootstrap.sh` at this point should be minimal, as I _ought_ to incorporate [some prompt mechanism](https://github.com/dylang/grunt-prompt) as a part of my default grunt task to perform the work of updating a `package.json` file for the user (if it exists), otherwise clone one down and perform its setup of dependencies. This relies on my packaging my tasks into a proper npm package. The _true_ advantage of a `bootstrap.sh` would be that I could eliminate the requirement of running some `npm install ...` requirements, but this assumes installation of node + npm already, as it's a build automation server (which hopefully has things like [nvm](https://github.com/creationix/nvm)/[nvm-windows](https://github.com/coreybutler/nvm-windows) installed).

#### Gruntfile.js Config

I wrote a `Gruntfile.js` which performs the tasks of:

* checking for the `DXLClean.xsl` filter in the current project path (alternatively, one could not do this, and work out of the DORA installed copy in `~/dora/xsl/DXLClean.xsl`)
  * if it does not exist, downloads a copy from the raw file in the [GitHub DORA repository](https://github.com/camac/dora/blob/master/xsl/DXLClean.xsl)
* processes the specified files (`*.metadata`, etc.) into a temp folder
  * then back to the origin location (processing in-place caused some empty file issues that would fail out; this corrects that behavior)
  * cleans the temp folder back out

Here's a copy of the `Gruntfile.js`. Note [the file array](https://github.com/camac/dora/blob/master/dora.pl#L133-L159), which I duplicated from the dora project, also note the variable definition of the ODP path; since I can't assume every project has the same ODP name, setting it up front means that my Jenkins task can update the `Gruntfile.js` for correct path, depending on anything from a per-project definition to an environment variable. Here it is:

https://gist.github.com/edm00se/9816aa9e8d0109c2009d#Gruntfile.js

An interesting thing I had to overcome was, in a larger ODP, I had to write out the modified versions of the files to a `tmp/` path, as re-writing them in-place was causing an error of "no contents", or some weirdness. Copying to a temporary location, then copying back in solved this, apparently. Also, you can see that aside from the `Gruntfile.js` and `package.json`, if it doesn't find a copy of the `DXLClean.xsl`, it pulls a copy from the dora repository.

Here's a copy of the corresponding `package.json`, which I copy in if my Jenkins task script doesn't detect the `Gruntfile.js` and `package.json`. It's there exclusively for the dependency installation via `npm install` prior to the build.

https://gist.github.com/edm00se/9816aa9e8d0109c2009d#package.json

#### Executing Grunt

Provided that your automatic build environment has access to an installed version of `node` and `npm`, then your build script/task should be able to execute the grunt tasks with the default task association, `grunt`. By convention, it's best to ensure that all dependencies are installed first with `npm install` from within the project. Alternatively, this could be specified in the `package.json` of your project to be an `npm` script definition, such as `npm run clean` (see the script "clean" in the `package.json`). The benefit of this is that the `npm` "clean" script can be expanded to perform any other `npm` or command line tasks needed for the project, with the same, single command governing all execution.

### Onward and Upward

There's a bit more to this story, and next time, I'll cover the scripts I run and general Jenkins CI setup. I'm really thankful I've had some good help from a number of sources, including being able to pick [Cameron Gregor](https://camerongregor.com/)'s brain on occasion, which has led me to be able to set this all up. I have a couple hurdles yet before my normal application release cycle is the way I want it, but I'm past some hefty hurdles already. Stay tuned, and as always, thanks for reading.
