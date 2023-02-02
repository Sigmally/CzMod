(function () {
  "use strict";
  let link =
    document.querySelector("link[rel*='icon']") ||
    document.createElement("link");
  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = "https://i.ibb.co/zS3Qty7/sigLogo.png";
  document.getElementsByTagName("head")[0].appendChild(link);

  document.title = "Sigmally - CzMod";

  let CzSettings = localStorage.getItem("CzSettings");

  if (!CzSettings) {
    CzSettings = {
      /*
            keyBindingsRapidFeed: 'q',
            keyBindingsdoubleSplit: 'f',
            keyBindingsTripleSplit: 't',
            keyBindingsQuadSplit: 'r',
            */
      keyBindingsToggleMenu: "v",
      keyBindingsRespawn: "x",
    };
  } else {
    CzSettings = JSON.parse(CzSettings);
  }

  //from Sig mod (RingZer0)

  const KEY_FEED = {
    key: "w",
    keyCode: 32,
    which: 32,
  };
  const KEY_SPLIT = {
    keyCode: 32,
    code: "Space",
    cancelable: true,
    composed: true,
    isTrusted: true,
    which: 32,
  };

  window.CzTimeouts = [];
  const amount = 10;

  window.addEventListener("keyup", (e) => {
    if (e.key == CzSettings.keyBindingsRapidFeed) {
      for (let i = 0; i < CzTimeouts.length; i++) {
        clearTimeout(CzTimeouts[i]);
      }
    }
  });

  /*
    const toggleKeyBindings = document.getElementById("enableKeyBindings");
    if (toggleKeyBindings) {
        toggleKeyBindings.addEventListener("change", function() {
            if (this.checked) {
                window.addEventListener("keydown", handleKeyBindings);
                localStorage.setItem("keyBindingsEnabled", true);
            } else {
                window.removeEventListener("keydown", handleKeyBindings);
                localStorage.setItem("keyBindingsEnabled", false);
            }
        });
        const keyBindingsEnabled = localStorage.getItem("keyBindingsEnabled");
        if (keyBindingsEnabled === "true") {
            toggleKeyBindings.checked = true;
            window.addEventListener("keydown", handleKeyBindings);
        } else {
            toggleKeyBindings.checked = false;
        }
    }
    */

  window.addEventListener("keydown", (e) => {
    if (event.code === "KeyV" && !document.activeElement.tagName !== "INPUT") {
      toggleMenu();
    }
    if (event.code === "KeyX") {
      location.reload();
      localStorage.setItem("reloaded", "success");
    }

    if (e.code == CzSettings.keyBindingsToggleMenu) {
      toggleMenu();
    }
    if (e.code == CzSettings.keyBindingsRespawn) {
      location.reload();

      localStorage.setItem("reloaded", "success");
    }

    if (e.key == "e") {
      window.dispatchEvent(new KeyboardEvent("keydown", KEY_FEED));
      window.dispatchEvent(new KeyboardEvent("keyup", KEY_FEED));
      window.dispatchEvent(new KeyboardEvent("keydown", KEY_FEED));
      window.dispatchEvent(new KeyboardEvent("keyup", KEY_FEED));
      window.dispatchEvent(new KeyboardEvent("keydown", KEY_FEED));
      window.dispatchEvent(new KeyboardEvent("keyup", KEY_FEED));
      window.dispatchEvent(new KeyboardEvent("keydown", KEY_FEED));
      window.dispatchEvent(new KeyboardEvent("keyup", KEY_FEED));
      window.dispatchEvent(new KeyboardEvent("keydown", KEY_FEED));
      window.dispatchEvent(new KeyboardEvent("keyup", KEY_FEED));
      for (var i = 0; i < amount; ++i) {
        CzTimeouts.push(
          setTimeout(function () {
            window.dispatchEvent(new KeyboardEvent("keydown", KEY_FEED));
            window.dispatchEvent(new KeyboardEvent("keyup", KEY_FEED));
            window.dispatchEvent(new KeyboardEvent("keydown", KEY_FEED));
            window.dispatchEvent(new KeyboardEvent("keyup", KEY_FEED));
            window.dispatchEvent(new KeyboardEvent("keydown", KEY_FEED));
            window.dispatchEvent(new KeyboardEvent("keyup", KEY_FEED));
          }, i)
        );
      }

      return;
    }

    if (e.key == "f") {
      for (let i = 0; i < 2; ++i) {
        setTimeout(function () {
          window.dispatchEvent(new KeyboardEvent("keydown", KEY_SPLIT));
          window.dispatchEvent(new KeyboardEvent("keyup", KEY_SPLIT));
        }, i + 1);
      }
      return;
    }

    if (e.key == "t") {
      window.dispatchEvent(new KeyboardEvent("keydown", KEY_SPLIT));
      window.dispatchEvent(new KeyboardEvent("keyup", KEY_SPLIT));
      window.dispatchEvent(new KeyboardEvent("keydown", KEY_SPLIT));
      window.dispatchEvent(new KeyboardEvent("keyup", KEY_SPLIT));
      window.dispatchEvent(new KeyboardEvent("keydown", KEY_SPLIT));
      window.dispatchEvent(new KeyboardEvent("keyup", KEY_SPLIT));
      return;
    }

    if (e.key == "r") {
      window.dispatchEvent(new KeyboardEvent("keydown", KEY_SPLIT));
      window.dispatchEvent(new KeyboardEvent("keyup", KEY_SPLIT));
      window.dispatchEvent(new KeyboardEvent("keydown", KEY_SPLIT));
      window.dispatchEvent(new KeyboardEvent("keyup", KEY_SPLIT));
      window.dispatchEvent(new KeyboardEvent("keydown", KEY_SPLIT));
      window.dispatchEvent(new KeyboardEvent("keyup", KEY_SPLIT));
      window.dispatchEvent(new KeyboardEvent("keydown", KEY_SPLIT));
      window.dispatchEvent(new KeyboardEvent("keyup", KEY_SPLIT));
      return;
    }
  });

  window.addEventListener("load", (event) => {
    if (localStorage.getItem("reloaded") === "success") {
      setTimeout(() => {
        RespawnedMessage();
        let playBtn = document.getElementById("play-btn");
        setTimeout(() => {
          playBtn.click();
        }, 500);
      }, 1000);
      localStorage.removeItem("reloaded");
    }
  });

  let modMenu = document.createElement("div");
  modMenu.classList.add("modMenuOverlay");
  modMenu.innerHTML = `
    <button class="button open-btn" id="open">Open</button>
    `;

  let menu = document.createElement("div");
  menu.style = "display: none; opacity: 0;";
  menu.id = "Modmenu";
  menu.innerHTML = `
<div class="top-menu">
                <img src="https://i.ibb.co/stMSFvd/Cz-Mod-Logo.png" class="Logo" draggable="false">
                <button class="button close-btn" id="closeMenuBtn">X</button>
                <h1 class="title">Cz Mod</h1>
            </div>
            <div class="Modmenu__inner">
                <div class="options">
                    <button id="KeyBindingsButton" class="OptionsButton">Key Bindings</button>
                    <button id="reduceLagsButton" class="OptionsButton">Reduce lags</button>
                    <button id="StylishNameButton" class="OptionsButton">Stylish Name</button>
                    <button id="funOptionsButton" class="OptionsButton">Fun options</button> <!--Rainbow background, change ingame background color, bot....-->
                    <button id="othersButton" class="OptionsButton">Other options</button> <!--Youtube, discord, credits...-->
                </div>
                <hr style="width: 95%; color: #BDBDBD;">
                <div class="MenuOptions">
                    <div class="ChangeOpacity">
                        <label>Mod Menu Opacity:</label>
                        <input type="range" min="15" max="100" value="100" id="menuOpacity" class="slider">
                        <label>button Opacity:</label>
                        <input type="range" min="15" max="100" value="100" id="buttonOpacity" class="slider">
                    </div>
                    <div class="ChangeMenuColor">
                        <div class="centerItem">
                            <span style="text-align: center; margin-top: 2px;">Sigmally Menu Theme:</span>
                            <div class="DarkWhiteTheme">
                                <button class="night" id="nightBtn"></button>
                                <button class="light" id="lightBtn"></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ExtraBtns">
                    <p>-Cz Mod by Cursed-</p>
                    <button class="SocialMedia-Btn" id="socialMediaButton">Social Media</button>
                    <button class="Info-Btn" id="infoButton">Info</button>
                </div>
                <div class="Option-tab" id="keybinds-tab">
                    <button class="backBtn" id="KBTBACK-button"><img src="https://i.ibb.co/1sJxQXn/backIcon.png"><span>back</span></button>
                    <h2>Key Bindings</h2>
                    <div class="keybindings__inner">
                            <span class="alignCenter">Currently you can't change keybindings. <br> you will able to change them in the next updates</span>
                            <!--<div class="KeyBindingsOption">
                                <span class="span__description">Enable Keybindings</span>
                                <input type="checkbox" class="checkbox" id="enableKeyBindings" checked>
                            </div>-->
                            <div class="KeyBindingsOption">
                                <span class="span__description">Macros / fast feed</span>
                                <div style="display:flex; justify-content: center; align-items: center;">
                                   <input type="text" class="keybinding" value="e" disabled id="fastFeedInput" maxlength="1" onfocus="this.select()">
                                   <button class="install-Bot-Btn" onclick="window.open('https://www.youtube.com/watch?v=J8dJ8jZ4Cx0', '_blank')" style="width: 100px; margin-left: 5px">AHK macros</button>
                                </div>
                            </div>
                            <div class="KeyBindingsOption">
                                <span class="span__description">double split</span>
                                <input type="text" class="keybinding" value="f" disabled id="doubleSplit" maxlength="1" onfocus="this.select()">
                            </div>
                            <div class="KeyBindingsOption">
                                <span class="span__description">triple split</span>
                                <input type="text" class="keybinding" value="t" maxlength="1" disabled onfocus="this.select()" id="tripleSplit">
                            </div>
                            <div class="KeyBindingsOption">
                                <span class="span__description">quad split</span>
                                <input type="text" class="keybinding" value="r" maxlength="1" disabled onfocus="this.select()" id="quadSplit">
                            </div>
                            <div class="KeyBindingsOption">
                                <span class="span__description">open / close menu</span>
                                <input type="text" class="keybinding" value="v"  maxlength="1" disabled onfocus="this.select()" id="toggleMenuKB">
                            </div>
                            <div class="KeyBindingsOption">
                                <span class="span__description">simple Respawn</span>
                                <input type="text" class="keybinding" value="x"  maxlength="1" disabled onfocus="this.select()" id="respawnKB">
                            </div>
                    </div>
                </div>
                <div class="Option-tab" id="reduceLags-tab">
                    <button class="backBtn" id="RLTBACK-button"><img src="https://i.ibb.co/1sJxQXn/backIcon.png"><span>back</span></button>
                    <h2>reduce lags</h2>
                    <div class="RLT__inner">
                        <div class="reduceLagsOption">
                            <span class="span__description">Turn off all Skins</span>
                            <input type="checkbox" id="showSkins" class="checkbox">
                        </div>
                        <div class="reduceLagsOption">
                            <span class="span__description">Turn off all Names</span>
                            <input type="checkbox" id="showNames" class="checkbox">
                        </div>
                        <div class="reduceLagsOption">
                            <span class="span__description">Hide irrelevant menus</span>
                            <input type="checkbox" id="HideRightAndLeftMenusBtn" class="checkbox">
                        </div>
                    </div>
                </div>
                <div class="Option-tab" id="stylishName-tab">
                    <button class="backBtn" id="SNTBACK-button"><img src="https://i.ibb.co/1sJxQXn/backIcon.png"><span>back</span></button>
                    <h2>Stylish name</h2>
                    <div class="SNT__inner">
                    <!--
                        <input type="text" placeholder="Save a name" id="saveNameInput">
                        <button class="install-Bot-Btn">Save</button>
                        -->
                        <span style="margin-top: 30px;">Stylish Name Websites:</span>
                        <div class="spanText">
                            <a href="https://www.stylishnamemaker.com" target="_blank" class="Btn"><input type="button" value="Stylishnamemaker" class="divBtn"/></a>
                            <a href="https://nickfinder.com" target="_blank" class="Btn"><input type="button" value="Nickfinder" class="divBtn"/></a>
                        </div>
                        <span class="spanText">Saved Names: coming Soon!</span>
                        <!--<div id="savedNames"></div>-->
                    </div>
                </div>
                <div class="Option-tab" id="funOptions-tab">
                    <button class="backBtn" id="FOTBACK-button"><img src="https://i.ibb.co/1sJxQXn/backIcon.png"><span>back</span></button>
                    <h2>fun Options</h2>
                    <div class="FOT__inner">
                        <div class="FunOption">
                            <span class="span__description">rainbow menu background</span>
                            <input type="checkbox" id="rainbowMenu" class="checkbox">
                        </div>
                        <div class="FunOption">
                            <span class="span__description">flashing background (game)</span>
                            <input type="checkbox" class="checkbox" id="flashBGCB">
                        </div>
                        <div class="FunOption">
                            <span class="span__description">fake unlock random coin skin</span>
                            <input type="button" class="install-Bot-Btn" id="randomSkin" value="random Skin">
                        </div>
                    </div>
                </div>
                <div class="Option-tab scrollable" id="otherOptions-tab">
                    <button class="backBtn" id="OOTBACK-button"><img src="https://i.ibb.co/1sJxQXn/backIcon.png"><span>back</span></button>
                    <h2>other Options</h2>
                    <div class="scrollDiv">
                        <div class="OOT__inner">
                            <div class="otherOption">
                                <span class="span__description">Feedback / Suggestion</span>
                                <div class="FeedbackDandG">
                                    <input class="btn-Choose" type="button" value="Gmail" onclick="window.open('https://mail.google.com/mail/u/0/?view=cm&fs=1&to=czmod.czrsd@gmail.com&su=Feedback%20or%20Suggestion%20for%20CzMod', '_blank')">
                                    <input class="btn-Choose" type="button" value="Discord" onclick="window.open('https://discord.gg/gHmhpCaPfP', '_blank')">
                                </div>
                            </div>
                            <div class="otherOption">
                                <span class="span__description">Custom main Menu Colors</span>
                                <div class="Colors">
                                    <div class="alignCenter">
                                        <span>Menu:</span>
                                        <input type="color" value="#ffffff" class="changeColor" id="ColorPicker1">
                                    </div>
                                    <div class="alignCenter">
                                        <span>text:</span>
                                        <input type="color" value="#ffffff" class="changeColor" id="ColorPicker2">
                                    </div>
                                </div>
                            </div>
                            <div class="otherOption">
                                <span class="span__description">Sigmally Bot (temporary)</span>
                                <button class="install-Bot-Btn" style="font-size: 18px;" id="install-bot">install</button>
                            </div>
                            <div class="otherOption">
                                <span class="span__description">Hide Open Button</span>
                                <button class="install-Bot-Btn" style="font-size: 18px;" id="HideOpenBtn">Hide</button>
                            </div>
                            <div class="otherOption autoRespawn">
                                <span class="span__description">Auto Respawn</span>
                                <div class="alignCenter">
                                    <input type="checkbox" class="checkbox" id="autoRespawn">
                                    <input type="number" id="ARspeed" class="numberInput" value="1000" placeholder="Speed(ms)">
                                </div>
                            </div>
                            <div class="otherOption">
                                <span class="span__description">Delete Skin</span>
                                <div class="alignCenter">
                                    <input type="text" class="inputSkinText" placeholder="Skin Id" id="skinIdInput">
                                    <input type="text" class="inputSkinText" placeholder="category(Free, Premium, Level)" id="skinCategoryInput">
                                    <input type="button" class="install-Bot-Btn" id="DelSkinBtn" value="Delete">
                                </div>
                            </div>
                            <div class="otherOption">
                                <span class="span__description">Skin Ids</span>
                                <button class="install-Bot-Btn" style="font-size: 18px;" id="skinsButton">Skins</button>
                            </div>
                            <div class="otherOption">
                                <span class="span__description">Remove Ads</span>
                                <input type="checkbox" class="checkbox" id="removeAds" checked>
                            </div>
                            <div class="otherOption">
                                <span class="span__description">Long nickname</span>
                                <div class="alignCenter">
                                    <input type="checkbox" class="checkbox" id="longNickname">
                                </div>
                            </div>
                            <div class="otherOption">
                                <span class="span__description">Spectate Button</span>
                                <div class="alignCenter">
                                    <input type="checkbox" class="checkbox" id="spectateBtn">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="Option-tab" id="SocialMedia-tab">
                    <button class="backBtn" id="SMTBACK-button"><img src="https://i.ibb.co/1sJxQXn/backIcon.png"><span>back</span></button>
                    <h2>Social Media</h2>
                    <div class="OOT__inner">
                        <div class="otherOption">
                            <span class="span__description">Youtube</span>
                            <div class="YoutubeChannels">
                                <input class="btn-Choose" type="button" value="Cursed" onclick="window.open('https://www.youtube.com/@cursed9645', '_blank')">
                                <input class="btn-Choose" type="button" value="Sigmally Mods" onclick="window.open('https://www.youtube.com/@sigmallymod', '_blank')">
                            </div>
                        </div>
                        <div class="otherOption">
                            <span class="span__description">Discord | cursd#0126</span>
                            <div class="Discord">
                                <input class="btn-Choose" type="button" value="Join Server" onclick="window.open('https://discord.gg/gHmhpCaPfP', '_blank')">
                            </div>
                        </div>
                        <div class="otherOption">
                            <span class="span__description">GitHub</span>
                            <div class="Discord">
                                <input class="btn-Choose" type="button" value="view" onclick="window.open('https://github.com/Sigmally', '_blank')">
                            </div>
                        </div>
                        <span class="span__description" style="margin-top: 50px;">Cz Mod</span>
                    </div>
                </div>
                <div class="Option-tab" id="Info-tab">
                    <button class="backBtn" id="ITB-button"><img src="https://i.ibb.co/1sJxQXn/backIcon.png"><span>back</span></button>
                    <h2>Info about Cz Mod</h2>
                    <div class="OOT__inner">
                        <div class="otherOption">
                            <span class="span__description">Version: 0.1.0 [BETA]</span>
                        </div>
                        <div class="otherOption">
                            <span class="span__description"><a href="#" style="text-decoration: none; color: #7878cf; cursor: pointer;">how to use CzMod</a></span>
                        </div>
                        <div class="otherOption">
                            <span class="span__description">Creator: Cursed</span>
                        </div>
                        <div class="otherOption">
                            <span class="span__description">Published: 01/02/2023</span>
                        </div>
                        <div class="otherOption">
                            <input class="btn-Choose" type="button" value="change log" onclick="window.open('https://github.com/Sigmally/CzMod/blob/main/Changelog', '_blank')">
                        </div>
                        <div class="otherOption">
                            <span class="span__description" style="text-align: center;">Credits: Ultra, Ringzer0; Insperation from Ringzer0's sigmally Mod</span>
                        </div>
                    </div>
                </div>
                <div class="Option-tab" id="skins-tab">
                    <button class="backBtn" id="STBACK-button"><img src="https://i.ibb.co/1sJxQXn/backIcon.png"><span>back</span></button>
                    <h2>Skins</h2>
                    <div class="scrollDiv">
                        <div class="OOT__inner">
                            <div id="skin-sections">
                                <div class="skin-section" id="free-skins">
                                    <span>coming soon</span>
                                </div>
                                <div class="skin-section" id="premium-skins"></div>
                                <div class="skin-section" id="level-skins"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    `;

  modMenu.appendChild(menu);
  document.body.prepend(modMenu);

  //CzMod scripts

  //Delete Skin
  let DelSkinBtn = document.getElementById("DelSkinBtn");
  DelSkinBtn.addEventListener("click", () => {
    let skinIdInput = document.getElementById("skinIdInput").value;
    let skinCategoryInput = document.getElementById("skinCategoryInput").value;
    unsafeWindow.delSkin(skinIdInput, skinCategoryInput);
  });

  //auto Respawn
  let intervalId = null;

  function AutoRespawn() {
    document.getElementById("continue_button").click();
    document.getElementById("play-btn").click();
    unsafeWindow.hideDeathScreenx;
  }
  let speed = document.getElementById("ARspeed");

  let ARcb = document.getElementById("autoRespawn");
  ARcb.onchange = function () {
    if (this.checked) {
      let delay = speed.value;
      intervalId = setInterval(AutoRespawn, delay);
    } else {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  /*save names
    let savedNames = JSON.parse(localStorage.getItem("namesArray")) || [];
    if (!savedNames.length) savedNames = ["user1"];
    const savedNamesDiv = document.getElementById('savedNames');
    const saveNameInput = document.getElementById('saveNameInput');
    const saveBtn = document.getElementById('saveBtn');
    if(saveBtn){
        saveBtn.addEventListener('click', function() {
            savedNames.push(saveNameInput.value);
            localStorage.setItem("namesArray", JSON.stringify(savedNames));
            savedNamesDiv.innerHTML = "";
            savedNames.forEach(name => {
                const div = document.createElement("div");
                div.innerText = name;
                div.style = 'z-index: 99997; height: 100px; width: 200px;';
                savedNamesDiv.appendChild(div);
            });
        });
    }
    if (localStorage.getItem("namesArray")) {
        savedNames = JSON.parse(localStorage.getItem("namesArray"));
        savedNames.forEach(name => {
            const div = document.createElement("div");
            div.innerText = name;
            savedNamesDiv.appendChild(div);
        });
    }
*/

  let playBtn = document.getElementById("play-btn");
  playBtn.style.transition = ".3s";

  let spectate = document.createElement("button");
  spectate.style =
    "background-image: url('https://i.ibb.co/NxKqFbV/eyeIconn.png');  height: 34px; width: 15%; background-size: cover; background-position: 0; background-repeat: no-repeat; transition: .3s; margin: 2px 0px";
  spectate.classList.add(
    "btn",
    "btn-play",
    "btn-success",
    "btn-needs-server",
    "hidden"
  );
  spectate.id = "spectate-btn";

  spectate.addEventListener("click", function () {
    unsafeWindow.spectate();
    drawSpectateMenu();
    let e = new KeyboardEvent("keydown", {
      keyCode: 81,
      which: 81,
      key: "q",
      code: "KeyQ",
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(e);
  });

  let div = document.createElement("div");
  div.classList.add("playAndSpectateButton");
  div.style =
    "display: flex; justify-content: space-between; align-items: center; height: 35px;";

  div.appendChild(playBtn);
  div.appendChild(spectate);

  document.getElementsByClassName("menu__item")[0].appendChild(div);

  let signOutBtn = document.getElementById("signOutBtn");
  let signInBtn = document.getElementById("signInBtn");
  signOutBtn.style.transition = ".3s";

  let playAndSpectateButton = document.getElementsByClassName(
    "playAndSpectateButton"
  )[0];

  if (signInBtn) {
    signInBtn.insertAdjacentElement("beforebegin", playAndSpectateButton);
  } else if (signOutBtn) {
    signOutBtn.insertAdjacentElement("beforebegin", playAndSpectateButton);
  }

  function drawSpectateMenu() {
    let SpectateMenu = document.createElement("div");
    SpectateMenu.id = "spectateDiv";

    let textContent = document.createElement("span");
    textContent.innerHTML = "Press Q to change Spectate mode";
    textContent.style = "color: #fff; text-align: center; display: flex;";
    SpectateMenu.appendChild(textContent);

    let buttonActions = document.createElement("div");
    buttonActions.style = "display: flex";
    SpectateMenu.appendChild(buttonActions);

    let topButton = document.createElement("button");
    topButton.textContent = "^";
    topButton.style =
      "margin: 10px 5px; color: #fff; background-color: #333; outline: none; border: none; border-radius: 10px; padding: 5px 10px";
    buttonActions.appendChild(topButton);

    let closeBtn = document.createElement("button");
    closeBtn.textContent = "X";
    closeBtn.style =
      "margin: 10px 5px; color: #fff; background-color: #333; outline: none; border: none; border-radius: 10px; padding: 5px 10px;";
    buttonActions.appendChild(closeBtn);

    closeBtn.addEventListener("mouseover", function () {
      closeBtn.style.transition = ".3s";
      closeBtn.style.backgroundColor = "#444";
    });

    closeBtn.addEventListener("mouseout", function () {
      closeBtn.style.transition = ".3s";
      closeBtn.style.backgroundColor = "#333";
    });

    topButton.addEventListener("mouseover", function () {
      topButton.style.transition = ".3s";
      topButton.style.backgroundColor = "#444";
    });

    topButton.addEventListener("mouseout", function () {
      topButton.style.transition = ".3s";
      topButton.style.backgroundColor = "#333";
    });

    topButton.addEventListener("click", function () {
      SpectateMenu.style.transition = ".3s";
      if (topButton.textContent === "^") {
        topButton.textContent = "v";
        textContent.style.display = "none";
        SpectateMenu.style.top = "0px";
        SpectateMenu.style.borderBottomRightRadius = "50px";
        SpectateMenu.style.borderBottomLeftRadius = "50px";
      } else {
        SpectateMenu.style.top = "20px";
        topButton.textContent = "^";
        textContent.style.display = "flex";
        SpectateMenu.style.borderBottomRightRadius = "5px";
        SpectateMenu.style.borderBottomLeftRadius = "5px";
      }
    });

    const byId = (id) => document.querySelector(id);

    closeBtn.addEventListener("click", function () {
      byId("#menu-wrapper").style.display = "block";
      byId("#left-menu").style.display = "block";
      byId("#menu-links").style.display = "block";
      byId("#right-menu").style.display = "block";

      let sd = document.getElementById("spectateDiv");
      sd.style.display = "none";

      document.body.appendChild(SpectateMenu);
    });
  }

  function RespawnedMessage() {
    let messageSpan = "Respawned";
    /*
          let CBcm = document.getElementById('comingsoonCB');
          CBcm.checked = false;
        */
    const messageDiv = document.createElement("div");
    messageDiv.style = "display: flex; opacity: 0;";
    setTimeout(() => {
      messageDiv.style =
        "display: flex; opacity: 1; transition: .3s; top: 0px;";
    }, 50);
    messageDiv.classList.add("comingSoonDiv");
    messageDiv.innerHTML = `
        <div class="CSD">
            <span class="ComingSoonSpan" style="color: #fff;">${messageSpan}</span>
        </div>
    `;
    setTimeout(function () {
      messageDiv.style = "opacity: 0; transition: .3s; top: 20px;";
      setTimeout(function () {
        messageDiv.style.display = "none";
      }, 300);
    }, 2000);
    document.body.appendChild(messageDiv);
  }

  let open = document.getElementById("open");
  let isOpen = false;
  open.addEventListener("click", () => {
    toggleMenu();
    if (isOpen) {
      open.innerHTML = "Open";
      isOpen = false;
    } else {
      open.innerHTML = "Close";
      isOpen = true;
    }
  });

  let closeMenuBtn = document.getElementById("closeMenuBtn");
  closeMenuBtn.addEventListener("click", () => {
    smoothClose();
    if (menu) {
      if (isOpen) {
        open.innerHTML = "Close";
        isOpen = true;
      } else {
        open.innerHTML = "Open";
        isOpen = false;
      }
    }
  });

  function toggleMenu() {
    let modMenuOverlay = document.querySelector(".modMenuOverlay");
    let menu = document.getElementById("Modmenu");
    let open = document.getElementById("open");
    if (menu) {
      if (isOpen) {
        smoothClose();
        modMenuOverlay.style.pointerEvents = "none";
        open.innerHTML = "Open";
        // let CzSettings = {}
        // localStorage.setItem('CzSettings', JSON.stringify(CzSettings));
      } else {
        smoothOpen();
        modMenuOverlay.style.pointerEvents = "auto";
        open.innerHTML = "Close";
      }
    }
  }

  function smoothOpen() {
    let menu = document.getElementById("Modmenu");
    if (menu) {
      menu.style.display = "flex";
      setTimeout(function () {
        menu.style = "opacity: 1; transition: .3s;";
        isOpen = true;
      }, 1);
    }
  }

  function smoothClose() {
    /*
        let options = document.querySelector('.keybinding');
        CzSettings = {};
        for (var key of options.keys()) {
            CzSettings[key] = options.get(key);
        }
	localStorage.setItem('CzSettings', JSON.stringify(CzSettings));
    */
    let keybindingInputs = document.querySelector(".keybinding");
    keybindingInputs.value;

    let menu = document.getElementById("Modmenu");
    let modMenuOverlay = document.querySelector(".modMenuOverlay");
    modMenuOverlay.style.pointerEvents = "none";
    if (menu) {
      menu.style = "opacity: 0; transition: .3s;";
      setTimeout(function () {
        let open = document.getElementById("open");
        open.innerHTML = "Open";
        menu.style.display = "none";
        isOpen = false;
      }, 200);
    }
  }

  let MenuopctBtn = document.getElementById("menuOpacity");
  if (MenuopctBtn) {
    MenuopctBtn.oninput = function () {
      menuOpacityChange(this.value / 100, this);
    };
  }
  let ButtonopctBtn = document.getElementById("buttonOpacity");
  if (ButtonopctBtn) {
    ButtonopctBtn.oninput = function () {
      ButtonOpacityChange(this.value / 100, this);
    };
  }

  let installBotBtn = document.getElementById("install-bot");
  installBotBtn.addEventListener("click", () => {
    window.open(
      "https://greasyfork.org/scripts/459040-czbot-sigmally-bot",
      "_blank"
    );
  });

  function menuOpacityChange(val, elem) {
    let menu = document.getElementById("Modmenu");
    if (menu) {
      menu.style.opacity = val;
    }
  }

  function ButtonOpacityChange(val, elem) {
    let Btn = document.getElementById("open");
    Btn.style.opacity = val;
  }

  let hide = false;
  let HideRightAndLeftMenusBtn = document.getElementById(
    "HideRightAndLeftMenusBtn"
  );
  HideRightAndLeftMenusBtn.addEventListener("click", () => {
    let rightMenu = document.getElementById("right-menu");
    let leftMenu = document.getElementById("left-menu");
    let rightMenuQS = document.querySelector(".right-menu");
    let links = document.getElementById("menu-links");
    let bottom_ad = document.getElementById("ad_bottom");

    if (!hide) {
      rightMenu.style.opacity = 0;
      leftMenu.style.opacity = 0;
      rightMenuQS.style.opacity = 0;
      links.style.opacity = 0;
      bottom_ad.style.opacity = 0;
      rightMenu.style.pointerEvents = "none";
      leftMenu.style.pointerEvents = "none";
      hide = true;
    } else {
      rightMenu.style.opacity = "1";
      leftMenu.style.opacity = "1";
      rightMenuQS.style.opacity = "1";
      links.style.opacity = "1";
      rightMenu.style.pointerEvents = "auto";
      leftMenu.style.pointerEvents = "auto";
      hide = false;
    }
  });

  let showNamesCB = document.getElementById("showNames");
  let showNames = true;
  showNamesCB.addEventListener("click", () => {
    if (!showNames) {
      unsafeWindow.settings.showNames = true;
      showNames = true;
    } else {
      unsafeWindow.settings.showNames = false;
      showNames = false;
    }
  });
  let showSkinsCB = document.getElementById("showSkins");
  let showSkins = true;
  showSkinsCB.addEventListener("click", () => {
    if (showSkins == true) {
      unsafeWindow.settings.showSkins = false;
      showSkins = false;
    } else {
      unsafeWindow.settings.showSkins = true;
      showSkins = true;
    }
  });

  let menuColorPicker = document.getElementById("ColorPicker1");
  let textColorPicker = document.getElementById("ColorPicker2");

  menuColorPicker.oninput = () => {
    let menu = document.getElementById("menu");
    let rightMenu = document.querySelector(".top-users__inner");
    let leftMenu = document.getElementById("left-menu");
    let linksMenu = document.querySelector(".menu-links");
    let deathScreen = document.querySelector(".menu--stats-mode");

    menu.style.backgroundColor = menuColorPicker.value;
    rightMenu.style.backgroundColor = menuColorPicker.value;
    leftMenu.style.backgroundColor = menuColorPicker.value;
    linksMenu.style.backgroundColor = menuColorPicker.value;
    deathScreen.style.backgroundColor = menuColorPicker.value;
  };

  textColorPicker.oninput = () => {
    let bodyInner = document.querySelector(".body__inner");
    if (bodyInner) {
      let elements = bodyInner.querySelectorAll("label, span, td, h1, th, h3");
      elements.forEach((element) => {
        element.style.color = textColorPicker.value;
      });
    }
  };

  let RLT = document.getElementById("reduceLags-tab");
  let SNT = document.getElementById("stylishName-tab");
  let FOT = document.getElementById("funOptions-tab");
  let OOT = document.getElementById("otherOptions-tab");
  let SMT = document.getElementById("SocialMedia-tab");
  let IT = document.getElementById("Info-tab");
  let ST = document.getElementById("skins-tab");
  let KBT = document.getElementById("keybinds-tab");

  let buttons = document.querySelectorAll("button"); //select all button elements

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      let id = button.getAttribute("id"); //get the id of the button that was clicked
      if (id === "KeyBindingsButton") {
        KBT.style = "display: block; opacity: 0;";
        setTimeout(function () {
          KBT.style = "display: block; opacity: 1; transition: .3s;";
        }, 100);
      } else if (id === "reduceLagsButton") {
        RLT.style = "display: block; opacity: 0;";
        setTimeout(function () {
          RLT.style = "display: block; opacity: 1; transition: .3s;";
        }, 100);
      } else if (id === "StylishNameButton") {
        SNT.style = "display: block; opacity: 0;";
        setTimeout(function () {
          SNT.style = "display: block; opacity: 1; transition: .3s;";
        }, 100);
      } else if (id === "funOptionsButton") {
        FOT.style = "display: block; opacity: 0;";
        setTimeout(function () {
          FOT.style = "display: block; opacity: 1; transition: .3s;";
        }, 100);
      } else if (id === "othersButton") {
        OOT.style = "display: block; opacity: 0;";
        setTimeout(function () {
          OOT.style = "display: block; opacity: 1; transition: .3s;";
        }, 100);
      } else if (id === "socialMediaButton") {
        SMT.style = "display: block; opacity: 0;";
        setTimeout(function () {
          SMT.style = "display: block; opacity: 1; transition: .3s;";
        }, 100);
      } else if (id === "infoButton") {
        IT.style = "display: block; opacity: 0;";
        setTimeout(function () {
          IT.style = "display: block; opacity: 1; transition: .3s;";
        }, 100);
      } else if (id === "skinsButton") {
        ST.style = "display: block; opacity: 0;";
        setTimeout(function () {
          ST.style = "display: block; opacity: 1; transition: .3s;";
        }, 100);
      } else if (id === "KBTBACK-button") {
        KBT.style = "display: block; opacity: 0; transition: .3s;";
        setTimeout(function () {
          KBT.style = "display: none; opacity: 0;";
        }, 100);
      } else if (id === "RLTBACK-button") {
        RLT.style = "display: block; opacity: 0; transition: .3s;";
        setTimeout(function () {
          RLT.style = "display: none; opacity: 0;";
        }, 100);
      } else if (id === "SNTBACK-button") {
        SNT.style = "display: block; opacity: 0; transition: .3s;";
        setTimeout(function () {
          SNT.style = "display: none; opacity: 0;";
        }, 100);
      } else if (id === "FOTBACK-button") {
        FOT.style = "display: block; opacity: 0; transition: .3s;";
        setTimeout(function () {
          FOT.style = "display: none; opacity: 0;";
        }, 100);
      } else if (id === "OOTBACK-button") {
        OOT.style = "display: block; opacity: 0; transition: .3s;";
        setTimeout(function () {
          OOT.style = "display: none; opacity: 0;";
        }, 100);
      } else if (id === "SMTBACK-button") {
        SMT.style = "display: block; opacity: 0; transition: .3s;";
        setTimeout(function () {
          SMT.style = "display: none; opacity: 0;";
        }, 100);
      } else if (id === "ITB-button") {
        IT.style = "display: block; opacity: 0; transition: .3s;";
        setTimeout(function () {
          IT.style = "display: none; opacity: 0;";
        }, 100);
      } else if (id === "STBACK-button") {
        ST.style = "display: block; opacity: 0; transition: .3s;";
        setTimeout(function () {
          ST.style = "display: none; opacity: 0;";
        }, 100);
      }
    });
  });

  const skinLinks = {
    premium: [
      "https://u1.sigmally.com/server/skin/premium/Terri.png",
      "https://u1.sigmally.com/server/skin/premium/Yeti.png",
      "https://u1.sigmally.com/server/skin/premium/Worthington.png",
      "https://u1.sigmally.com/server/skin/premium/Waternoose.png",
      "https://u1.sigmally.com/server/skin/premium/Valentine.png",
      "https://u1.sigmally.com/server/skin/premium/Sulley.png",
      "https://u1.sigmally.com/server/skin/premium/Squibbles.png",
      "https://u1.sigmally.com/server/skin/premium/Smitty.png",
      "https://u1.sigmally.com/server/skin/premium/Spike.png",
      "https://u1.sigmally.com/server/skin/premium/Randall.png",
      "https://u1.sigmally.com/server/skin/premium/Peterson.png",
      "https://u1.sigmally.com/server/skin/premium/Needleman.png",
      "https://u1.sigmally.com/server/skin/premium/Michael.png",
      "https://u1.sigmally.com/server/skin/premium/Josh.png",
      "https://u1.sigmally.com/server/skin/premium/Jack.png",
      "https://u1.sigmally.com/server/skin/premium/Gesner.png",
      "https://u1.sigmally.com/server/skin/premium/George.png",
      "https://u1.sigmally.com/server/skin/premium/Fungus.png",
      "https://u1.sigmally.com/server/skin/premium/Derek.png",
      "https://u1.sigmally.com/server/skin/premium/Captain.png",
      "https://u1.sigmally.com/server/skin/premium/Carlton.png",
      "https://u1.sigmally.com/server/skin/premium/Cara.png",
      "https://u1.sigmally.com/server/skin/premium/Maya.png",
      "https://u1.sigmally.com/server/skin/premium/Brandywine.png",
      "https://u1.sigmally.com/server/skin/premium/Boo.png",
      "https://u1.sigmally.com/server/skin/premium/Bile.png",
      "https://u1.sigmally.com/server/skin/premium/Art.png",
      //peep (level)
      "https://u1.sigmally.com/server/skin/level/Peep.png",
    ],
  };

  let randomSkin = document.getElementById("randomSkin");
  randomSkin.addEventListener("click", () => {
    let skin = document.getElementById("js-skin-select-icon");
    let randomIndex = Math.floor(Math.random() * skinLinks.premium.length);
    let randomImageLink = skinLinks.premium[randomIndex];
    skin.style = `background-image: url(${randomImageLink};`;
  });

  //rainbowMenu

  let rainbowMenuBtn = document.getElementById("rainbowMenu");
  rainbowMenuBtn.onclick = checkStatus;
  let enableRainbowBackground = false;

  function checkStatus() {
    if (enableRainbowBackground == false) {
      changeBackground();
    } else if (enableRainbowBackground == true) {
      noBackground();
    }
  }

  function changeBackground() {
    enableRainbowBackground = true;
    let menu = document.getElementById("menu");
    let rightMenu = document.querySelector(".top-users__inner");
    let leftMenu = document.getElementById("left-menu");
    let linksMenu = document.querySelector(".menu-links");
    let deathScreen = document.querySelector(".menu--stats-mode");

    menu.style.background =
      "linear-gradient(120deg, red, orange, yellow, green, blue, indigo, violet)";
    menu.style.backgroundSize = "1000% 400%";
    menu.style.backgroundPosition = "0% 0%";

    rightMenu.style.background =
      "linear-gradient(120deg, red, orange, yellow, green, blue, indigo, violet)";
    rightMenu.style.backgroundSize = "1000% 400%";
    rightMenu.style.backgroundPosition = "0% 0%";
    rightMenu.style.borderRadius = "15px";

    leftMenu.style.background =
      "linear-gradient(120deg, red, orange, yellow, green, blue, indigo, violet)";
    leftMenu.style.backgroundSize = "1000% 400%";
    leftMenu.style.backgroundPosition = "0% 0%";

    linksMenu.style.background =
      "linear-gradient(120deg, red, orange, yellow, green, blue, indigo, violet)";
    linksMenu.style.backgroundSize = "1000% 400%";
    linksMenu.style.backgroundPosition = "0% 0%";

    deathScreen.style.background =
      "linear-gradient(120deg, red, orange, yellow, green, blue, indigo, violet)";
    deathScreen.style.backgroundSize = "1000% 400%";
    deathScreen.style.backgroundPosition = "0% 0%";

    const keyframeAnimation = `
        @keyframes rainbow {
            0% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
            100% {
                background-position: 0% 50%;
            }
        }
    `;

    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(keyframeAnimation, styleSheet.cssRules.length);

    menu.style.animation = "rainbow 5s ease infinite";
    rightMenu.style.animation = "rainbow 5s ease infinite";
    leftMenu.style.animation = "rainbow 5s ease infinite";
    linksMenu.style.animation = "rainbow 5s ease infinite";
    deathScreen.style.animation = "rainbow 5s ease infinite";
  }

  function noBackground() {
    enableRainbowBackground = false;
    let menu = document.getElementById("menu");
    let rightMenu = document.querySelector(".top-users__inner");
    let leftMenu = document.getElementById("left-menu");
    let linksMenu = document.querySelector(".menu-links");
    let deathScreen = document.querySelector(".menu--stats-mode");
    menu.style.background = "";
    menu.style.backgroundSize = "100%";
    menu.style.backgroundPosition = "";

    rightMenu.style.background = "";
    rightMenu.style.backgroundSize = "100%";
    rightMenu.style.backgroundPosition = "";

    leftMenu.style.background = "";
    leftMenu.style.backgroundSize = "100%";
    leftMenu.style.backgroundPosition = "";

    linksMenu.style.background = "";
    linksMenu.style.backgroundSize = "100%";
    linksMenu.style.backgroundPosition = "";

    deathScreen.style.background = "";
    deathScreen.style.backgroundSize = "100%";
    deathScreen.style.backgroundPosition = "";
  }

  //dark Main Menu

  function darkModeMenu() {
    //menu colors
    let menu = document.getElementById("menu");
    let rightMenu = document.querySelector(".top-users__inner");
    let leftMenu = document.getElementById("left-menu");
    let linksMenu = document.querySelector(".menu-links");
    let deathScreen = document.querySelector(".menu--stats-mode");

    menu.style.backgroundColor = "#333";
    menu.style.color = "#D5D5D5";

    rightMenu.style.backgroundColor = "#333";
    rightMenu.style.color = "#D5D5D5";

    leftMenu.style.backgroundColor = "#333";
    leftMenu.style.color = "#D5D5D5";

    linksMenu.style.backgroundColor = "#333";
    linksMenu.style.color = "#D5D5D5";

    deathScreen.style.backgroundColor = "#333";
    deathScreen.style.color = "#D5D5D5";
  }

  function lightModeMenu() {
    let menu = document.getElementById("menu");
    let rightMenu = document.querySelector(".top-users__inner");
    let leftMenu = document.getElementById("left-menu");
    let linksMenu = document.querySelector(".menu-links");
    let deathScreen = document.querySelector(".menu--stats-mode");
    let body = document.querySelector("body");
    body.style.color = "#fff";

    menu.style.backgroundColor = "#fff";

    rightMenu.style.backgroundColor = "#fff";
    rightMenu.style.Color = "#000";

    leftMenu.style.backgroundColor = "#fff";

    linksMenu.style.backgroundColor = "#fff";

    deathScreen.style.backgroundColor = "#fff";
  }

  /*
// get the buttons
const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
// define the function that will handle the click event for both buttons
function handleButtonClick(event) {
  if (event.target === button1) {
    console.log('test1');
  } else if (event.target === button2) {
    console.log('test2');
  }
}
// add the click event listener to both buttons
button1.addEventListener('click', handleButtonClick);
button2.addEventListener('click', handleButtonClick);
*/

  let nb = document.getElementById("nightBtn");
  let lb = document.getElementById("lightBtn");

  nb.onclick = () => {
    darkMode();
    //text colors
    let bodyInner = document.querySelector(".body__inner");
    if (bodyInner) {
      let elements = bodyInner.querySelectorAll("label, span, td, h1, th, h3");
      let SkinsTxt = document.getElementById("js-skin-select-icon-text");
      elements.forEach((element) => {
        element.style.color = "#fff";
        SkinsTxt.style.color = "#fff";
      });
    }
  };
  lb.onclick = () => {
    lightMode();
    //text colors
    let bodyInner = document.querySelector(".body__inner");
    if (bodyInner) {
      let elements = bodyInner.querySelectorAll("label, span, td, h1, th, h3");
      let SkinsTxt = document.getElementById("js-skin-select-icon-text");
      elements.forEach((element) => {
        element.style.color = "#333";
        SkinsTxt.style.color = "#333";
      });
    }
  };

  function lightMode() {
    let menu = document.getElementById("menu");
    let rightMenu = document.querySelector(".top-users__inner");
    let leftMenu = document.getElementById("left-menu");
    let linksMenu = document.querySelector(".menu-links");
    let deathScreen = document.querySelector(".menu--stats-mode");
    menu.style.backgroundColor = "#fff";
    rightMenu.style.backgroundColor = "#fff";
    leftMenu.style.backgroundColor = "#fff";
    linksMenu.style.backgroundColor = "#fff";
    deathScreen.style.backgroundColor = "#fff";

    let nb = document.getElementById("nightBtn");
    let lb = document.getElementById("lightBtn");

    lb.style.border = "2px solid #2b39ff";
    nb.style.border = "2px solid #222";
  }

  function darkMode() {
    let menu = document.getElementById("menu");
    let rightMenu = document.querySelector(".top-users__inner");
    let leftMenu = document.getElementById("left-menu");
    let linksMenu = document.querySelector(".menu-links");
    let deathScreen = document.querySelector(".menu--stats-mode");
    menu.style.backgroundColor = "#222";
    rightMenu.style.backgroundColor = "#222";
    leftMenu.style.backgroundColor = "#222";
    linksMenu.style.backgroundColor = "#222";
    deathScreen.style.backgroundColor = "#222";

    let nb = document.getElementById("nightBtn");
    let lb = document.getElementById("lightBtn");

    nb.style.border = "2px solid #2b39ff";
    lb.style.border = "2px solid #222";
  }

  function WelcomeMessage() {
    /*
    const welcomeDiv = document.createElement("div");
    welcomeDiv.innerHTML = 'test'; /////coming soon...
    document.body.appendChild(welcomeDiv)
    */
  }

  WelcomeMessage();

  //background Flash

  let darkthemeCheckbox = document.getElementById("darkTheme");
  let FlashBGcb = document.getElementById("flashBGCB");
  let flashingBg;
  FlashBGcb.addEventListener("click", () => {
    if (FlashBGcb.checked) {
      flashingBg = setInterval(function () {
        darkthemeCheckbox.click();
        /*
                unsafeWindow.settings.darkTheme = false / true (setTimeout)...;
                */
      }, 100);
    } else {
      clearInterval(flashingBg);
    }
  });

  let longNickname = document.getElementById("longNickname");
  longNickname.addEventListener("click", () => {
    let nick = document.getElementById("nick");
    if (longNickname.checked) {
      nick.maxLength = 50;
    } else {
      nick.maxLength = 15;
    }
  });

  let HideOpenBtn = document.getElementById("HideOpenBtn");
  let openBtn = document.getElementById("open");

  if (openBtn) {
    HideOpenBtn.addEventListener("click", () => {
      if (openBtn.style.display !== "none") {
        openBtn.style.display = "none";
        HideOpenBtn.innerHTML = "Show";
      } else {
        openBtn.style.display = "flex";
        HideOpenBtn.innerHTML = "Hide";
      }
    });
  }

  let ads = document.querySelectorAll(
    "#text-block, #left_ad_block, #ad_bottom, .ad-block-left, .ad-block-right, .ad-block__inner"
  );
  ads.forEach((ad) => {
    ad.classList.add("removeAds");
  });

  let removeAds = document.getElementById("removeAds");
  removeAds.addEventListener("change", () => {
    let ads = document.querySelectorAll(
      "#text-block, #left_ad_block, #ad_bottom, .ad-block-left, .ad-block-right, .ad-block__inner"
    );
    if (removeAds.checked) {
      ads.forEach((ad) => {
        ad.classList.add("removeAds");
      });
    } else {
      ads.forEach((ad) => {
        ad.classList.remove("removeAds");
      });
    }
  });

  let plusBtn = document.querySelector(".plus");
  plusBtn.addEventListener("click", () => {
    alert(
      "this option is currently unavailable, Update the mod if the Developers fixed it."
    );
  });

  let spectateBtnOption = document.getElementById("spectateBtn");
  spectateBtnOption.addEventListener("click", () => {
    let spectateBtn = document.getElementById("spectate-btn");
    let playBtn = document.getElementById("play-btn");
    if (spectateBtnOption.checked) {
      spectateBtn.style.display = "flex";
      playBtn.style.width = "83%";
    } else {
      spectateBtn.style.display = "none";
      playBtn.style.width = "100%";
    }
  });

  function comingSoonMessage() {
    let messageSpan = "coming Soon!";
    /*
        let CBcm = document.getElementById('comingsoonCB');
        CBcm.checked = false;
*/
    const messageDiv = document.createElement("div");
    messageDiv.style = "display: flex; opacity: 0;";
    setTimeout(() => {
      messageDiv.style =
        "display: flex; opacity: 1; transition: .3s; margin-top: 20px;";
    }, 50);
    messageDiv.classList.add("comingSoonDiv");
    messageDiv.innerHTML = `
        <div class="CSD">
            <span class="ComingSoonSpan">${messageSpan}</span>
        </div>
    `;
    setTimeout(function () {
      messageDiv.style = "opacity: 0; transition: .3s; margin-top: 0px;";
      setTimeout(function () {
        messageDiv.style.display = "none";
      }, 300);
    }, 2000);
    document.body.appendChild(messageDiv);
  }

  function s() {
    const messageDiv = document.createElement("div");
    messageDiv.style = "display: flex; opacity: 0;";
    setTimeout(() => {
      messageDiv.style =
        "display: flex; opacity: 1; transition: .3s; margin-top: 20px;";
    }, 50);
    messageDiv.classList.add("comingSoonDiv");
    messageDiv.innerHTML = `
        <div class="CSD">
            <span class="ComingSoonSpan">This Mod still contains Bugs and will be updated soon.</span>
            <button class="button">read more</button>
        </div>
    `;
    setTimeout(function () {
      messageDiv.style = "opacity: 0; transition: .3s; margin-top: 0px;";
      setTimeout(function () {
        messageDiv.style.display = "none";
      }, 300);
    }, 2000);
    document.body.appendChild(messageDiv);
  }
})();

let CS = document.createElement("style");
CS.type = "text/css";
CS.innerHTML = CzStyle;
(document.head || document.documentElement).appendChild(CS);