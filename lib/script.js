var app = {
title:"EasyRPG Player",
game:"YUME NIKKI ONLINE",
version:"v0.032"
}; // Game Info 
var online = {
  player: {name},
  chat: {}
}; // Relevant for Online Multiplayer Support

var menuButtons = {
  "fullscreenBT":{
    visible: 1,
    target:"A",
    class:"fullscreen",
    action:"toggleFullscreen()",
    display:"block",
    title:"Enter Fullscreen"
  },
  audioBT:{
    visible: 1,
    target:"A",
    class:"volume-high",
    action:"toggleAudio()",
    display:"block",
    title:"Mute/Unmute Audio"
  },
  padBT:{
    visible: 1, 
    target:"A",
    class:"gamepad-variant",
    action:"toggleGamepad()",
    display:"block",
    title:"Hide/Show Virtual Gamepad"
  },  
  chatBT:{
    visible: 1, 
    target:"C",
    class:"chat-remove",
    action:"toggleChat()",
    display:"block",
    title:"Hide/Show Chat"
  },
  clearBT:{
    visible: 1,
    target:"C",
    class:"broom",
    action:"clearChat()",
    display:"block",
    title:"Clear Chat"
  },
  renameBT:{
    visible: 1,
    target:"C",
    class:"account displayName",
    action:"selectPlayerName()",
    display:"block",
    title:"Change your Nickname"
  }
  
}; // All the buttons from the Bottom Menu
var gamepad = {
  bottomL: { length:3, keys: {
    "ArrowLeft&ArrowUp": {
      class: "arrow dummy BT",
      "data-key-code": "37&38"
    },
    ArrowUp: {
      class: "arrow",
      "data-key-code": "38"
    },
    "ArrowUp&ArrowRight": {
      class: "arrow dummy BT",
      "data-key-code": "38&39"
    },
    ArrowLeft: {
      class: "arrow rot90 flip",
      "data-key-code": "37"
    },
    dummy: {
      class: "arrow dummy",
      "data-key-code": ""
    },
    ArrowRight: {
      class: "arrow rot90",
      "data-key-code": "37"
    },
    "ArrowLeft&ArrowDown": {
      class: "arrow dummy BT",
      "data-key-code": "37&40"
    },
    ArrowDown: {
      class: "arrow flip",
      "data-key-code": "40"
    },
    "ArrowDown&ArrowRight": {
      class: "arrow dummy BT",
      "data-key-code": "40&39"
    }
  } },
  bottomR: { length:4, keys: {
    "numeric_/": {
      class: "input small mdi mdi-36px mdi-slash-forward",
      "data-key-code": "111"
    },
    "numeric_*": {
      class: "input small mdi mdi-asterisk",
      "data-key-code": "106"
    },
    "numeric_-": {
      class: "input small mdi mdi-minus-thick",
      "data-key-code": "109"
    },    
    "numeric_.": {
      class: "input small mdi mdi-circle-small",
      "data-key-code": "110"
    },
    "numeric_7": {
      class: "input small mdi mdi-36px mdi-numeric-7",
      "data-key-code": "103"
    },
    "numeric_8": {
      class: "input small mdi mdi-36px mdi-numeric-8",
      "data-key-code": "104"
    },
    "numeric_9": {
      class: "input small mdi mdi-36px mdi-numeric-9",
      "data-key-code": "105"
    },
    "numeric_+": {
      class: "input small mdi mdi-plus-thick",
      "data-key-code": "107"
    },
    "numeric_4": {
      class: "input small mdi mdi-36px mdi-numeric-4",
      "data-key-code": "100"
    },
    "numeric_5": {
      class: "input small mdi mdi-36px mdi-numeric-5",
      "data-key-code": "101"
    },
    "numeric_6": {
      class: "input small mdi mdi-36px mdi-numeric-6",
      "data-key-code": "102"
    },
    "toggleNumeric": {
      class: "input ctrl mdi mdi-36px mdi-apps",
      "data-key-code": "toggleNumeric"
    },
    "numeric_1": {
      class: "input small mdi mdi-36px mdi-numeric-1",
      "data-key-code": "97"
    },
    "numeric_2": {
      class: "input small mdi mdi-36px mdi-numeric-2",
      "data-key-code": "98"
    },
    "numeric_3": {
      class: "input small mdi mdi-36px mdi-numeric-3",
      "data-key-code": "99"
    },
    "dummy-small": {
      class: "input small dummy",
      "data-key-code": "dummy"
    },
    "dummy-small-0": { //0 Line
      class: "input small dummy",
      "data-key-code": ""
    },
    "numeric_0": {
      class: "input small mdi mdi-36px mdi-numeric-0",
      "data-key-code": "96"
    },   
    "dummy-small": {
      class: "input small dummy",
      "data-key-code": "dummy"
    },
    "dummy": {
      class: "input small dummy",
      "data-key-code": "dummy"
    },
    "dummy": { //esc Line
      class: "input dummy",
      "data-key-code": "spacer"
    },
    "dummy": {
      class: "input dummy",
      "data-key-code": "spacer"
    },
    "Escape": {
      class: "input mdi mdi-24px mdi-keyboard-esc",
      "data-key-code": "27"
    },
    "Shift": {//shift line
      class: "input mdi mdi-24px mdi-apple-keyboard-shift shift",
      "data-key-code": "16"
    },
    "dummy-enter": {
      class: "input dummy",
      "data-key-code": "spacer"
    }, 
    "Enter": {
      class: "input mdi mdi-24px mdi-arrow-left-bottom-bold",
      "data-key-code": "13"
    }, 
    "dummy": {
      class: "input dummy",
      "data-key-code": "spacer"
    }
  } },
  topL: { length:100, keys: {} },
  topR: { length:100, keys: {} },
  numericPad:0,
}; // Gamepad buttons and Layout

function initPage() {
  updateGameTitle(app);
  
  online.player.name = "GUEST" + Math.floor(1000 + Math.random() * 9000);
  online.chat.messages = document.getElementById("messages");

  loadMenuButtons("menuButtons");
  loadGamepadButtons("bottomL");
  loadGamepadButtons("bottomR");

  updatePlayerName(online.player.name);
  resizeWindow();
};
initPage();

function resizeWindow() {
  invlerp = function(a, b, c) {
  return Math.min(1, Math.max(0, (c - a) / (b - a)));
};

  centerFrame = {
  id:document.getElementById("centerFrame"),
  CSS:["translate(-50%, -50%)scale(",")"]
}
  resizeFrame = function(a) { 
    wSize = [document.body.clientWidth,document.body.clientHeight];
    fSize = [a.id.clientWidth,a.id.clientHeight +50];

    frameSize = wSize[1] > wSize[0] ? fSize[0] : fSize[1];
    windowSize =  wSize[1] > wSize[0] ? wSize[0] : wSize[1];

    val = invlerp(0, frameSize, windowSize);
    a.id.style.transform = a.CSS[0] + val + a.CSS[1];
};
  
  window.addEventListener("resize", function(a) {
  return resizeFrame(centerFrame);
}, !0);
  resizeFrame(centerFrame);
};
function updateGameTitle(a) {
  title = document.querySelector(":root").style;
  
  title.setProperty("--gameName", "' [ " + a.title + " ] "+ a.game+"'");
  title.setProperty("--gameVersion", "' " + a.version+"'");
  
};

function loadMenuButtons(b) { 
Object.entries(this[b]).forEach(entry => {
 addMenuButton(entry[0], entry[1] ); 
});
};
function addMenuButton(id, b) {
  if (!b.visible) return;
  b.target = document.getElementById("foot"+b.target);
  b.target.innerHTML += `<a id="`+ id +`"class="icons mdi-`+b.class+`" onclick="`+b.action+`" style="display: `+b.display+`" title="`+b.title+`"></a>`
};

function loadGamepadButtons(parent) {
  i = 0;
  target = document.getElementById(parent);
  content = '<div>';
  Object.entries(gamepad[parent].keys).forEach((entry) => {
    if (i % gamepad[parent].length == 0) content += '</div><div class="line">';
    content += addGamepadButton(entry[0], entry[1]);
    i++;
  });
  target.innerHTML += content + "</div>";
};
function addGamepadButton(id, b) {
  var clickAction = 
      b["data-key-code"] =="toggleNumeric" ? 
      "onclick='"+ b["data-key-code"] +"()'" : "";

  id = id.replace('numeric_', '');
  return`
    <div id="apad-` + id +
    `" data-key="` + id +
    `" data-key-code="` + b["data-key-code"] +
    `" class="` + b["class"] +
    `"` + clickAction +`></div>`;
};

function checkPlayerName(a) {
    invalidERR = "Invalid Nickname";

    if (a == "") return displayMessage(buildMessage.alert(invalidERR, "error"));
    console.log("??/")
    if (!/^[A-Za-z0-9]+$/.test(a)) return displayMessage(buildMessage.alert(invalidERR, "error"));

    return "ok";
};
function updatePlayerName(a) {
    online.player.name = a;

    return document
        .querySelector(":root")
        .style.setProperty("--playerName", "'" + online.player.name + "'");
};
function selectPlayerName(nameInput) {
if (nameInput) newName = nameInput;
else    newName = prompt(
        `Enter a Nickname. Numbers and latin letters only.`,
        online.player.name);
  
        if (newName == null) return;

    newName = removeHTML(newName).substring(0, 9);

    if (newName == online.player.name) return;
    checkName = checkPlayerName(newName);
    if (!checkName) return;
    updatePlayerName(newName);
    displayMessage(
        buildMessage.alert(
            "Your Nickname is <a onclick='selectPlayername()' >"             + online.player.name +" </a>now."
        )
    );
};

var buildMessage = {
    alert: function(msg, type = "") {
        return (
 `<li class="alert ` + type +`"> 
  <div>` +msg +`</div>
  </li>`
        );
    },
    chat: function(user, msg, me) {
        if (me) me = [`<div class="flip">`, `me`, `<\div>`];
        else me = ["", "", ""];

        return (
            `<li>
   ` + me[0] + `
      <div class="msgWrap ` + me[1] + `">
         <div id="user">` + user +
            `</div>
         <div id="message">` + msg +
            `</div>
      </div>
   <br>` + me[2] + `
</li>`
        );
    }
};
function displayMessage(msg) {
scroll = (online.chat.messages.scrollHeight - online.chat.messages.scrollTop === online.chat.messages.clientHeight);

    online.chat.messages.innerHTML += msg;

    if(scroll) online.chat.messages.scrollTop = online.chat.messages.scrollHeight;
};
function removeHTML(target) {
    return target.replace(/(<([^>]+)>)/gi, "");
};

function toggleFullscreen() {
 toggleClasses("fullscreenBT","icons icons mdi-fullscreen-exit","icons mdi-fullscreen"); 
};
function toggleAudio() {
toggleClasses("audioBT","icons mdi-volume-high","icons mdi-volume-off");
};
function toggleGamepad() {
//   toggleChat("hide");
//   toggleCSSdisplay("chatBT");
  
  toggleCSSdisplay("bottomL");
  toggleCSSdisplay("bottomR");
};

function toggleChat(force) {
    toggleClasses("chatBT","icons mdi-chat-remove","icons mdi-chat", force);
    toggleCSSdisplay("chatbox", force);
    toggleCSSdisplay("renameBT", force);
    toggleCSSdisplay("clearBT", force);

resizeFrame(centerFrame);
};
function toggleCSSdisplay(a,force) {
  a = document.getElementById(a);

  if (force == "show") return a.style.display = "block"
  else if (force == "hide") return a.style.display = "none";

  a.style.display = "none" == a.style.display ? "block" : "none";
};
function toggleClasses(ID, a, b, force) {
if (force == "show") return document.getElementById(ID).className = a;
else if (force == "hide") return document.getElementById(ID).className = b;

  if(document.getElementById(ID).className == a)
    document.getElementById(ID).className = b;
  else
     document.getElementById(ID).className = a;
};

function toggleNumeric(){
  a = document.querySelector(":root").style;

  if (gamepad.numericPad == 0) return gamepad.numericPad = 1,
  a.setProperty("--numericOpacity", "1"),
  a.setProperty("--numericEvents", "all");

  a.setProperty("--numericOpacity", "0");
  a.setProperty("--numericEvents", "none");
  gamepad.numericPad = 0;
};

function clearChat() {
    online.chat.messages.innerHTML = `
<li class="alert">
				<div>
					<br>🧹 Chat Clear 🧹
					<br>
					<br>
				</div>
			</li>
`;
};

function chatInputActionFired() {
    chatInput = document.getElementById("chatInput");
    chatInput.select();
    chatInput.value = removeHTML(chatInput.value);

    if (chatInput.value === "") return;

    msg = buildMessage.chat(online.player.name, chatInput.value, 1);
    chatInput.value = "";

    displayMessage(msg);
};
function displayInfo() {
  toggleChat("show");
info =`
<br>
<br><b>YUME NIKKI ONLINE 
<br>v0.032</b>
<br>
<br>-------------------------------------------------------------
<br>
<br>🔗<a>Changelog</a>🔗
<br>
<br>🔗<a>Source Code [ CLIENT ]</a>🔗
<br>🔗<a>Source Code [ SERVER ]</a>🔗
<br>
<br>🔗<a>Discord Channel</a>🔗
<br>
<br>
<br>
`
msg = buildMessage.alert(info);
  displayMessage(msg);
};

const hasTouchscreen = window.matchMedia('(hover: none), (pointer: coarse)').matches;
const preventNativeKeys = ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft', ' ', 'F12'];
const keys = new Map();
const keysDown = new Map();
const canvas = document.getElementById('canvas');
let lastTouchedId;

// Make EasyRPG player embeddable
canvas.addEventListener('mouseenter', () => window.focus());
canvas.addEventListener('click', () => window.focus());

// Handle clicking on the fullscreen button
document.querySelector('#fullscreenBT').addEventListener('click', () => {
  if (hasTouchscreen) {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  } else {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    }
  }
});

/**
 * Simulate a keyboard event on the emscripten canvas
 *
 * @param {string} eventType Type of the keyboard event
 * @param {string} key Key to simulate
 * @param {number} keyCode Key code to simulate (deprecated)
 */
function simulateKeyboardEvent(eventType, key, keyCode) {
  // simulate multiple key events (data-key and data-key-code containing "&"):
  let mk = key.split('&');
  if (mk.length > 1) {
    let mkc = keyCode.split('&');
    for (var i = 0; i < mk.length; i++) {
      let node = document.querySelector('[data-key="' + mk[i] + '"]');
      if (eventType == 'keydown') {
        node.classList.add('active');
      } else {
        node.classList.remove('active');
      }
      simulateKeyboardEvent(eventType, mk[i], mkc[i]);
    }
    return;
  }
  // simulate regular key event:
  const event = new Event(eventType, { bubbles: true });
  event.key = key;
  event.code = key;
  // Deprecated, but necessary for emscripten somehow
  event.keyCode = keyCode;
  event.which = keyCode;

  canvas.dispatchEvent(event);
}

/**
 * Simulate a keyboard input from `keydown` to `keyup`
 *
 * @param {string} key Key to simulate
 * @param {number} keyCode Key code to simulate (deprecated)
 */
function simulateKeyboardInput(key, keyCode) {
  simulateKeyboardEvent('keydown', key, keyCode);
  window.setTimeout(() => {
    simulateKeyboardEvent('keyup', key, keyCode);
  }, 100);
}

/**
 * Bind a node by a specific key to simulate on touch
 *
 * @param {*} node The node to bind a key to
 * @param {string} key Key to simulate
 * @param {number} keyCode Key code to simulate (deprecated)
 */
function bindKey(node, key, keyCode) {
  keys.set(node.id, { key, keyCode });

  node.addEventListener('touchstart', event => {
    event.preventDefault();
    simulateKeyboardEvent('keydown', key, keyCode);
    keysDown.set(event.target.id, node.id);
    node.classList.add('active');
  });

  node.addEventListener('touchend', event => {
    event.preventDefault();

    const pressedKey = keysDown.get(event.target.id);
    if (pressedKey && keys.has(pressedKey)) {
      const { key, keyCode } = keys.get(pressedKey);
      simulateKeyboardEvent('keyup', key, keyCode);
    }

    keysDown.delete(event.target.id);
    node.classList.remove('active');
  
    if (lastTouchedId) {
      document.getElementById(lastTouchedId).classList.remove('active');
    }
  });

  // Inspired by https://github.com/pulsejet/mkxp-web/blob/262a2254b684567311c9f0e135ee29f6e8c3613e/extra/js/dpad.js
  node.addEventListener('touchmove', event => {
    const { target, clientX, clientY } = event.changedTouches[0];
    const origTargetId = keysDown.get(target.id);
    const nextTarget = document.elementFromPoint(clientX, clientY);
    if (nextTarget === null) return;
    const nextTargetId = nextTarget.id;
    if (origTargetId === nextTargetId) return;

    if (origTargetId) {
      const { key, keyCode } = keys.get(origTargetId);
      simulateKeyboardEvent('keyup', key, keyCode);
      keysDown.delete(target.id);
      document.getElementById(origTargetId).classList.remove('active');
    }

    if (keys.has(nextTargetId)) {
      const { key, keyCode } = keys.get(nextTargetId);
      simulateKeyboardEvent('keydown', key, keyCode);
      keysDown.set(target.id, nextTargetId);
      lastTouchedId = nextTargetId;
      document.getElementById(nextTargetId).classList.add('active');
    }
  })
}

// Bind all elements providing a `data-key` attribute with the
// given key on touch-based devices
if (hasTouchscreen) {
  for (const button of document.querySelectorAll('[data-key]')) {
    bindKey(button, button.dataset.key, button.dataset.keyCode);
  }
} else {
  // Prevent scrolling when pressing specific keys
  window.addEventListener('keydown', event => {
    if (preventNativeKeys.includes(event.key)) {
      event.preventDefault();
    }
  });

  canvas.addEventListener('contextmenu', event => {
    event.preventDefault();
    // simulateKeyboardInput('Escape', 27);
  });

  // canvas.addEventListener('click', () => {
  //   simulateKeyboardInput('Enter', 13);
  // });
}
