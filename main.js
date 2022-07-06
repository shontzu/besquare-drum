import boom from "./sounds/boom.wav";
import clap from "./sounds/clap.wav";
import hi_hat from "./sounds/hi_hat.wav";
import kick from "./sounds/kick.wav";
import open_hat from "./sounds/open_hat.wav";
import ride from "./sounds/ride.wav";
import snare from "./sounds/snare.wav";
import tink from "./sounds/tink.wav";
import tom from "./sounds/tom.wav";

//TODO: one variable to manage game state (switch case)
let app_mode = false; //numeration
let record = false;
let playback = false;
let setting = false;

const start_game_btn = document.getElementById("start_game");
const record_game_btn = document.getElementById("record");
const playback_game_btn = document.getElementById("playback");
const setting_game_btn = document.getElementById("setting");
const box = document.getElementById("setting-page");
let intervalID;
// const myInterval = setInterval(myTimer, 1000);

start_game_btn.addEventListener("click", () => {
  app_mode = !app_mode;
  if (app_mode === false) {
    start_game_btn.textContent = "Start Game";
  } else {
    start_game_btn.textContent = "End Game";
  }
  console.log("app_mode: " + app_mode);
});

record_game_btn.addEventListener("click", () => {
  record = !record;
  if (record === false) {
    record_game_btn.textContent = "Record";
  } else {
    record_game_btn.textContent = "Recording";
    time.start_time = Date.now();
  }
  console.log("record: " + record);
});

playback_game_btn.addEventListener("click", (e) => {
  playback = !playback;
  if (playback === false) {
    playback_game_btn.textContent = "Playback";
    clearInterval(intervalID);
  } else {
    playback_game_btn.textContent = "Stop";
    let i = 0;
    intervalID = setInterval(function () {
      console.log(game_record[i].sound);
      const audio = new Audio(game_record[i].sound);
      audio.play();
      i++;
      if (i > game_record.length) {
        clearInterval(intervalID);
        console.log("end");
      }
    }, game_record[i].duration);
  }

  //TODO: settimeout
  console.log("playback: " + playback);
  game_record.forEach((e) => {
    console.log(e);
  });
});

setting_game_btn.addEventListener("click", (e) => {
  setting = !setting;
  if (setting === false) {
    setting_game_btn.textContent = "Settings";
    box.style.display = "none";
  } else {
    setting_game_btn.textContent = "Home";
    box.style.display = "block";
  }
  console.log("settings: " + setting);
});

const key_config = [
  { id: "boom", key: "a", sound: boom },
  { id: "clap", key: "s", sound: clap },
  { id: "hi_hat", key: "d", sound: hi_hat },
  { id: "kick", key: "f", sound: kick },
  { id: "open_hat", key: "g", sound: open_hat },
  { id: "ride", key: "h", sound: ride },
  { id: "snare", key: "j", sound: snare },
  { id: "tim", key: "k", sound: tink },
  { id: "tom", key: "l", sound: tom },
];

const time = { start_time: "", end_time: "", duration: "", key: "", sound: "" }; //object
const game_record = []; //array

const beats = ["f", "d", "f", "d", "f", "f", "d", "f", "d"];
const padding_count = 3;
const empty_array = Array(padding_count).fill("");

//  <div class="card sequence-card">A</div>
const targets = document.getElementById("targets");
let new_array = [...empty_array, ...beats, ...empty_array];

// Game Mode
let current_index = 0;
let score = 0;

const getActualPosition = () => current_index + padding_count;

const score_element = document.getElementById("score");
const updateTargets = () => {
  targets.innerHTML = "";
  const computed_array = new_array.slice(
    current_index,
    getActualPosition() + 4
  );
  // console.log(computed_array);
  computed_array.forEach((item, index) => {
    const target_div = document.createElement("div");
    target_div.setAttribute(
      "class",
      `card sequence-card ${index === 3 ? "active" : ""}`
    );
    target_div.textContent = item;
    targets.appendChild(target_div);
  });
  score_element.textContent = score;
};
updateTargets();

/**
 * <div id="boom" class="card control">
     <div class="label container">A</div>
     <div class="key container">Boom</div>
   </div>
 */

const parent = document.getElementById("controls");
key_config.forEach((k) => {
  //     { id: "boom", key: "a", sound: boom },
  const control_div = document.createElement("div");
  control_div.setAttribute("id", k.id);
  control_div.setAttribute("class", "card control");

  const control_label = document.createElement("div");
  control_label.setAttribute("class", "label container");
  control_label.textContent = k.key;

  const control_key = document.createElement("div");
  control_key.setAttribute("class", "key container");
  control_key.textContent = k.id;

  control_div.appendChild(control_label);
  control_div.appendChild(control_key);
  parent.appendChild(control_div);

  control_div.addEventListener("click", (e) => {
    const audio = new Audio(k.sound);
    audio.play();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key.toLocaleLowerCase() === k.key) {
      const audio = new Audio(k.sound);
      audio.play();
    } else {
      return;
    }

    // If user key matches current target key then we increment
    if (app_mode === true && new_array[getActualPosition()] === e.key) {
      current_index++;
      score++;

      time.end_time = Date.now();
      time.duration = time.end_time - time.start_time;
      time.key = e.key;
      time.sound = k.sound;
      if (record === true) {
        game_record.push({ ...time });
        console.log(game_record);
      }
    }

    if (getActualPosition() >= new_array.length - padding_count - 1) {
    }

    updateTargets();
  });
});

/*

if app_mode is start, then record
minus the datetime now with a value(??) and have start time and duration variable 
key recording variable to hold functionality of recording
set within click and keydown function
playback use setInterval(), go through recording array, check the keys in 100ms, if exceed time, will play sound move to next index
in settings feature, should be able to update key feature

*/
