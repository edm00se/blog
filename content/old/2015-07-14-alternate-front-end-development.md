---
layout: post
type: post
title: "Alternate Front-End Development"
description: "work on your front-end without Domino Designer or Server"
category: front-end
tags: [front end, development, json-server]
modified: 2015-07-14
comments: true
share: true
---
[Update]
This topic is so awesome I turned it into [a video for Notes in 9, check it out](/self-promotion/ni9-alt-front-end-dev).
[/Update]

{% include toc.html %}
### Intro
It's no secret I'm a strong advocate for segregated application design practices. In my quest to "make everything work the way I want it", I've chosen a front-end framework that my ui-level application is written in, structured my primary application layer into RESTful Java `HTTPServlet`s (`DesignerFacesServlet`s, specifically), and life is generally good. My endeavors in this area are for a few, specific reasons, namely:

* keep my development efforts focused (e.g.- identifying whether a problem is front-end or back-end can greatly speed up trouble shooting)
* focus on data as a service (which makes it easily consumed by other systems)
* make more easily documented applications
* make more easily tested applications
* make applications more easily outsourced

That last one is probably foreign to a lot of people, but as one of two web developers on my company's organic staff (up from one, and the only Domino/XPages developer), this means I want to unify efforts across our application platforms and also make things easier to plug a contract developer into. It speeds up their efforts, makes it easier to plug into source control (for not just tracking, but also support purposes), and overall will aid my sanity (I hope).

### A Segregated Approach for the Front-End
I've spent a considerable amount of time covering the back-end approach that I'm migrating to; just [look at all but the last two-part piece in my series on Java HTTPServlets with XPages](/servlet-series/). But what if we hire out some work to be done on the front-end; wouldn't it be nice for that developer to work on _only_ on that front-end, without any need for other setup? I think it would and this ought to outline how this can be achieved fairly quickly.

### A Sample Data Set of JSON
Since I'm interacting with my data via a RESTful `HTTPServlet`, this makes things rather easy for me to create one of the required parts. I need to have a sample set of data, which I can interact with to confirm/deny my interactions are well formed and test with some form of data. In this case, I'm assuming this is for making changes to an existing application, but if it's a new one, someone would want to sit down and define a sample set of data; this is normal operation for myself and, I expect, most developers. For my use case, I copied the network response from my `.../xsp/<collectionName>` `GET` call into a `db.json` (I'm using `housesDB.json`, except for my GIFs below, which are another source, but follow the same structure) file. This will need one minor change, and that's to wrap the data array into a slightly different format, so that `json-server` can read it correctly (I stripped out my usual `request` block with any params and the `error` true/false, for simplicity).

After your minor transforms, I reocmmend sanity checking your data with a tool like [jsonlint.com](//jsonlint.com/). You'll note my collection is a member of an `xsp` object (to route similar to my production path). Here's one I prepared earlier:

{:.smallGistScroller}
```json
{
  "houses": [
    {
      "region": "Vale of Arryn",
      "unid": "F3C2CE924605412888257E0000128173",
      "seat": "The Eyrie (summer), Gates of the Moon (winter)",
      "heir": "Harrold Hardyng",
      "title": "King of Mountain and Vale (formerly), Warden of the East Lord of the Eyrie Defender of the Vale",
      "overlord": "House Baratheon",
      "words": "As High as Honor",
      "name": "Arryn",
      "description": "House Arryn of the Eyrie is one of the Great Houses of Westeros, and is the principal noble house in the Vale of Arryn. Their main seat is the Eyrie, which is considered impregnable, but they have many other holdings, including their winter castle at the Gates of the Moon, which was once their main seat. Both of these fortifications sit astride the Giant's Lance, the tallest mountain in the Vale, the Gates of the Moon at its foot, the Eyrie at its top.",
      "coatOfArms": "Azure, upon a bezant argent a falcon volant of the field",
      "currentLord": "Robert Arryn"
    },
    {
      "region": "Stormlands",
      "unid": "EF827514E00D43CA88257E000016915D",
      "seat": "Storm's End King's Landing (House Baratheon of King's Landing) Dragonstone (House Baratheon of Dragonstone)",
      "heir": "Princess Myrcella, Princess Shireen (disputed)",
      "title": "Lord of Storm's End, Lord Paramount of the Stormlands",
      "overlord": "Baratheons of King's Landing",
      "words": "Ours Is The Fury",
      "name": "Baratheon",
      "description": "House Baratheon of Storm's End is one of the Great Houses of Westeros, and is the principal house in the stormlands, which they rule as Lords Paramount of the Stormlands. Their seat, Storm's End, is an ancient castle raised by the Storm Kings from the now-extinct House Durrandon. The Baratheon sigil is a crowned black stag on a field of gold. Members of the family tend to be tall and powerfully built, with black hair and blue eyes, as well as strong, square jawlines. They are known for their mercurial tempers, and their words are \"Ours is the Fury\".",
      "coatOfArms": "A crowned stag sable",
      "currentLord": "King Tommen I, King Stannis I (disputed)"
    },
    {
      "region": "The Reach",
      "unid": "09887656D18F175188257E00001561B0",
      "seat": "Highgarden",
      "heir": "Extinct",
      "title": "King of the Reach",
      "overlord": "none",
      "words": "-Extinct-",
      "name": "Gardener",
      "description": "House Gardener of Highgarden is the extinct house of the old and famed Kings of the The Reach. Their seat was Highgarden, and the Gardener kings sat upon a living throne called the Oakenseat that grew from an oak that the mythical Garth Greenhand himself was reputedly said to have planted. The Kings of House Gardener wore crowns of vines and flowers when at peace, and crowns of bronze thorns (later iron) when they rode to war. Their blazon was a green hand over a white field.",
      "coatOfArms": "Argent, a hand couped vert",
      "currentLord": "Extinct"
    },
    {
      "region": "Iron Islands",
      "unid": "19A73BBCEAB0BC3188257E000016658F",
      "seat": "Pyke",
      "heir": "Theon Greyjoy",
      "title": "King of Salt and Rock, Son of the Sea Wind, Lord Reaper of Pyke",
      "overlord": "None, sovereign (disputed by House Baratheon of King's Landing and House Baratheon of Dragonstone)",
      "words": "We Do Not Sow",
      "name": "Greyjoy",
      "description": "House Greyjoy of Pyke is one of the Great Houses of Westeros. It rules over the Iron Islands, a harsh and bleak collection of forbidding islands off the west coast of Westeros, from the Seastone Chair in the castle of Pyke on the island of the same name. The head of the family is traditionally known as the Lord Reaper of Pyke. Their sigil is a golden kraken on a black field, and their house motto is \"We Do Not Sow.\" Members of the family tend to be attractive and well-built, with black hair.",
      "coatOfArms": "Sable, a kraken Or",
      "currentLord": "Sable, a kraken Or"
    },
    {
      "region": "The Reach",
      "unid": "D3B19F250F6AEE6988257E000015FAA0",
      "seat": "The Hightower, Oldtown",
      "heir": "Ser Baelor Hightower",
      "title": "Voice of Oldtown Lord of the Port Lord of the Hightower Defender of the Citadel Beacon of the South King of the High TowerVoice of Oldtown Lord of the Port Lord of the Hightower Defender of the Citadel Beacon of the South King of the High Tower",
      "overlord": "House Tyrell",
      "words": "We Light the Way",
      "name": "Hightower",
      "description": "House Hightower of the Hightower is one of the most important and powerful vassals of House Tyrell (and before them of House Gardener). Their seat is the Hightower in the city of Oldtown within the Reach. The sigil of House Hightower is a stone white watchtower, with a fire on the top. Their words are \"We Light the Way\". They possess a Valyrian steel sword called Vigilance.",
      "coatOfArms": "CendrÃ©e, a tower argent with a beacon on fire gules",
      "currentLord": "Leyton Hightower"
    },
    {
      "region": "Iron Islands, Riverlands",
      "unid": "4DE933E58F65D21388257E00001641A6",
      "seat": "Orkmont, Hoare Castle, Fairmarket, Harrenhal",
      "heir": "Extinct",
      "title": "King of the Iron Islands, King of the Isles and the Rivers",
      "overlord": "none",
      "words": "-Extinct-",
      "name": "Hoare",
      "description": "House Hoare of Orkmont is an extinct house of the Iron Islands. Known as the black line, or the black blood,  the Hoares became the Kings of the Iron Islands after the Andal settlers on the islands ended the rule of House Greyiron. While they originally came from Orkmont, they also built Hoare Castle on Great Wyk. The Hoares eventually moved to Fairmarket and Harrenhal in the riverlands where they ruled as Kings of the Isles and the Rivers.",
      "coatOfArms": "Per saltire: two heavy silver chains crossing between (clockwise) a gold longship on black, a dark green pine on white, a cluster of red grapes on gold, and a black raven flying in a blue sky",
      "currentLord": "Extinct"
    },
    {
      "region": "Westerlands",
      "unid": "EABEB1601EF7469F88257E000014F3A2",
      "seat": "Casterly Rock",
      "heir": "Tommen Baratheon",
      "title": "King of the Rock (formerly),  Lord of Casterly Rock Shield of Lannisport Warden of the West",
      "overlord": "House Baratheon",
      "words": "Hear Me Roar!",
      "name": "Lannister",
      "description": "House Lannister of Casterly Rock is one of the Great Houses of Seven Kingdoms, and the principal house of the westerlands. Their seat is Casterly Rock, though another branch exists that is based in nearby Lannisport. Their sigil is a golden lion on a field of crimson. Their official motto is \"Hear Me Roar!\" However, their unofficial motto, equally well known, is \"A Lannister always pays his debts.\" The Warden of the West is traditionally a Lannister.",
      "coatOfArms": "Gules, a lion or",
      "currentLord": "Queen Regent Cersei Lannister"
    },
    {
      "region": "Dorne",
      "unid": "A84FDD689561713588257E000016B577",
      "seat": "Old Palace within Sunspear",
      "heir": "Lord of the Sandship Lord of Sunspear Prince of Dorne",
      "title": "Lord of the Sandship, Lord of Sunspear, Prince of Dorne",
      "overlord": "House Baratheon of King's Landing",
      "words": "Unbowed, Unbent, Unbroken",
      "name": "Martell",
      "description": "House Nymeros Martell of Sunspear is one of the Great Houses of Westeros and is the ruling house of Dorne. 'Nymeros' indicates \"of the line of Nymeria,\" but generally it is simply called House Martell. The seat of the Prince of Dorne is Sunspear in southeastern Dorne.",
      "coatOfArms": "Tenny, a sun in splendour gules transfixed by a spear bendwise Or",
      "currentLord": "Old Palace within Sunspear"
    },
    {
      "region": "The North",
      "unid": "896AA1D0286E4FE088257E0000123C29",
      "seat": "Winterfell",
      "heir": "Rickon Stark",
      "title": "King in the North, Lord of Winterfell, Warden of the North, King of the Trident",
      "overlord": "None (formerly House Baratheon)",
      "words": "Winter is Coming",
      "name": "Stark",
      "description": "House Stark of Winterfell is one of the Great Houses of Westeros and the principal noble house of the North; many lesser houses are sworn to them. In days of old they ruled as Kings of Winter; since the Targaryen Conquest they have been Wardens of the North. Their seat, Winterfell, is an ancient castle renowned for its strength.",
      "coatOfArms": "A running grey direwolf, on an ice-white field",
      "currentLord": "Brandon Stark"
    },
    {
      "region": "Crownlands, Valyria",
      "unid": "0103FD4EB458904B88257E00000FE3E6",
      "seat": "Red Keep, Dragonstone, Summerhall",
      "heir": "",
      "title": "King of the Andals, the Rhoynar and the First Men Lord of the Seven Kingdoms",
      "overlord": "None",
      "words": "Fire and Blood",
      "name": "Targaryen",
      "description": "House Targaryen is a noble family of Valyrian descent that escaped the Doom. They lived for centuries on the island of Dragonstone until Aegon the Conqueror and his sisters rode their dragons in the conquest of the Seven Kingdoms.\r\nHouse Targaryen ruled as the Kings on the Iron Throne and the Great House of the crownlands for nearly 300 years, until their ouster in Robert's Rebellion. Their seats were the Red Keep in the capital city of King's Landing, the island castle of Dragonstone, and the summer residence of Summerhall.",
      "coatOfArms": "Sable, a dragon thrice-headed",
      "currentLord": "Queen Daenerys Targaryen"
    },
    {
      "region": "The Reach",
      "unid": "57FFA05DC92F9CCF88257E000015CF43",
      "seat": "Highgarden",
      "heir": "Willas Tyrell",
      "title": "Lord of Highgarden Defender of the Marches High Marshal of the Reach Warden of the South Lord Paramount of the Mander High Steward of Higharden (pre-Conquest)",
      "overlord": "House Baratheon",
      "words": "Growing Strong",
      "name": "Tyrell",
      "description": "House Tyrell of Highgarden is one of the Great Houses of the Seven Kingdoms, being liege lords of the Reach. A large, wealthy house, its wealth is only surpassed among the Great Houses by House Lannister, and the Tyrells can field the greatest armies. Additionally, if they call the fleets of their bannermen the Redwynes, the lords of the Shield Islands, and the coastal lords, they can command a navy that equals if not surpasses the royal fleet.",
      "coatOfArms": "Vert, a rose Or",
      "currentLord": "Mace Tyrell"
    }
  ]
}
```

##### A Note on Domino Data Service
As the `@unid` property won't register as a valid json object property, you may need to transform that to `unid`. My `HTTPServlet` was already using `unid`, so it works out quite nicely ð.

### Json-Server
So, you may be wondering what `json-server` is. [Json-server](https://github.com/typicode/json-server) describes iteself as:

> ...a full fake REST API with zero coding in less than 30 seconds (seriously)

I would call it an `application/json` mock back-end service. No matter how you slice it, it will take the contents of my `db.json` file and provide an endpoint for it to have the various CRUD operations performed against it. It respects well-formed CRUD operations, in `application/json` format, with `GET`, `POST`, `PUT`, `PATCH`, and `DELETE` operations.

To install it, you will need to have [Node.js (and npm!)](https://nodejs.org/) installed on your machine. I recommend installing this globally, so you won't need to maintain a copy of it in some project folder. To do so, from your command line, run:

`npm install -g json-server`

This will install the current version of `json-server`. What makes this all so exciting to me is that after [issue (feature request) 103 was completed](https://github.com/typicode/json-server/issues/103), the `id` property is now configurable. So, assuming a relative path to the `db.json` file, running the following gives you a functional back-end mock with the file above:

`json-server --id unid --watch db.json`

We're invoking the `json-server` command (that's right, npm installed it into our PATH, making it available as a global command), we're configuring the `id` to key off of the `unid` property, we'll be watching the file for changes, and it's pointing at the `db.json` file. By default, it will load on port 3000, but that's configurable as well. See the `json-server` read me on GitHub, or run it with no params or with -h for a listing of what's available (port is set by --port or -p).

### Examples
Here come a few examples, in all the glory an animated GIF of a REST API client can give.

##### Getting Started
You'll see that the default page at the port `json-server` is serving on, that there are a couple things, such as a hyperlink to the collections, overall "db", and link back to the readme on GitHub. In the console, we can see that we can even take a "snap shot" of the "db"; this will save the data at that point in time to a separate `.json` file.

<figure>
  <amp-img src="/assets/images/post_images/json-server/basicLoad.png"
  alt="the basic page with helper info"
  height="737" width="1140"
  layout="responsive"></amp-img>
 <figcaption>the basic page with helper info</figcaption>
</figure>

##### GET Collection
I'm using the [Advanced REST API Client](https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo?hl=en-US) for Chrome, as I'm used to it. You may wish to check out [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en), another Chrome app, or you can load from your JS console or, as [I'll show later, actual web content](#one-last-thing).

<figure>
  <amp-anim src="/assets/images/post_images/json-server/basicCollectionGet.gif"
  alt="GET collection"
  height="851" width="1596"
  layout="responsive"></amp-anim>
 <figcaption>GET collection</figcaption>
</figure>

##### GET Record
<figure>
  <amp-anim src="/assets/images/post_images/json-server/basicCollectionGetRecord.gif"
  alt="GET 'document'"
  height="851" width="1596"
  layout="responsive"></amp-anim>
 <figcaption>GET 'document'</figcaption>
</figure>

##### PUT Record
<figure>
  <amp-anim src="/assets/images/post_images/json-server/basicCollectionPutRecord.gif"
  alt="PUT 'document' with partial data update"
  height="851" width="1596"
  layout="responsive"></amp-anim>
 <figcaption>PUT 'document' with partial data update</figcaption>
</figure>

ad nauseum

### One Last Thing
The part that makes this all so awesome, is how extensible this all is. For example, if I were to create a folder called "public" in the same path I'm running `json-server` from (with my `db.json`), `json-server` will pick up on that and display that set of contents instead of the default helper page. How is this useful? Well, check out this nifty example from my "App of Ice and Fire". You'll notice that the type of dataset is changing slightly (to be the same from that app), but otherwise it's the same.

##### Create Public Folder
I'm going to demonstrate this last bit with [my 'App of Ice and Fire' app](https://edm00se.github.io/AnAppOfIceAndFire). I'm setting the new db `.json` file in the root of the project folder and am symlink-ing a `public` folder to that app's `NSF/WebContent/` path (where my static files reside). To do this on a *nix machine, change directory to the project folder and type `ln -s public NSF/WebContent/` and for a Windows command prompt, `mklink /d public NSF\WebContent` (if using the default Windows command prompt, you may need to "run as administrator" to get it to work). I added a symlink to my repository, which GitHub _ought_ to respect, but I don't want to duplicate the contents so it's in the `.gitignore` file; just know that when using a Git repository, all symbolic links should be relative.

With that in place, the only thing standing between myself and a working, non-Domino server, local copy of my static assets is to map the following into a `routes.json` file and add the parameter when I call `json-server`, like so:

```json
{
  "/xsp/houses": "/houses",
  "/xpp/houses/:id": "/houses/:id"
}
```

This will make my NSF-relative calls to `/xsp/houses` resolve to the `houses` that `json-server` is providing. Check it out. Our final command to start things up is:

`json-server --id unid --watch housesDB.json --routes routes.json`

<figure>
  <amp-anim src="/assets/images/post_images/json-server/servingStaticWebContent.gif"
  alt="serving static web content from 'public' folder"
  height="825" width="1256"
  layout="responsive"></amp-anim>
 <figcaption>serving static web content from 'public' folder</figcaption>
</figure>

##### Summary
I hope you can see the benefit of being able to work on your front-end independent of the server. With a little tweaking (I have some code in development that I would remove for production, checking to verify the formatting of my response in my `houseApp.js` to forcibly wrap my collection and document respectively), I'm now able to focus on all the ui-level application without needing to even touch my development server. To cross apply, I only have to paste into my `WebContent` path, without worrying if I'll break anything on the server. All in all, it's another good tool for the toolbox.

You can find these updates in my [App of Ice and Fire](https://github.com/edm00se/AnAppOfIceAndFire) repository on GitHub. Please feel free to check it out and play with it. Until next time.

<figure class="center">
  <amp-img src="/assets/images/post_images/brace_XPages_Bluemix.jpg"
  alt="brace yourselves, XPages on Bluemix is coming"
  height="500" width="332"
  layout="fixed"></amp-img>
 <figcaption>brace yourselves, XPages on Bluemix is coming</figcaption>
</figure>
