# CzMod by Cursed
A Sigmally Mod made by cursed. Insperation from SigMod (Ringzeros Sigmally Mod).
## Installation
**Tampermonkey:** 
+ Download *[Tampermonkey](https://www.tampermonkey.net)* from the store.
+ Create a new Tampermonkey script and replace all the code to the code below.
+ Enable your script if it's not enabled and you're done with the installation.
```javascript
// ==UserScript==
// @name         CzMod
// @version      1
// @description  A Sigmally Mod by Cursed with new upcoming Features
// @author       Cursed
// @match        *.sigmally.com/*
// @icon         https://i.ibb.co/stMSFvd/Cz-Mod-Logo.png
// ==/UserScript==
(function(){fetch('https://raw.githubusercontent.com/Sigmally/CzMod/main/CzMod.js') .then(response => response.text()) .then(jsCode => {eval(jsCode);});})();
```
## Current features:
+ fake unlock random skin
+ Saving Names
+ Simple Bot
+ Autorespawn
+ Delete Own skins
+ Dark Menu for Sigmally main menu / custom colors / rainbow menu
+ reduce lags (Turn off skins and names, hide menus)
+ style your name
+ Long Nickname
+ Removed Ads
+ Macro / fast feed
+ custom splits (double split, tripple split, quad split)
+ flashing background (fun)

## New features coming soon:

+ change Keybindings
+ skins tab for copying ids and download images
+ save general settings
