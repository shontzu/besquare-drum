import boom from "./sounds/boom.wav";
import clap from "./sounds/clap.wav";
import hi_hat from "./sounds/hi_hat.wav";
import kick from "./sounds/kick.wav";
import open_hat from "./sounds/open_hat.wav";
import ride from "./sounds/ride.wav";
import snare from "./sounds/snare.wav";
import tink from "./sounds/tink.wav";
import tom from "./sounds/tom.wav";
 
let app_mode = "";
let record = false;

const start_game_btn = document.getElementById("start_game");
const record_game_btn = document.getElementById("record");

start_game_btn.addEventListener("click", () => {
  if (app_mode === "game") {
    start_game_btn.textContent = "Start Game";
    app_mode = "";
  } else {
    start_game_btn.textContent = "End Game";
    app_mode = "game";
  }
});

record_game_btn.addEventListener("click", () => {
  record = !record;
  if(record === false){
    record_game_btn.textContent="Record";
  }else {
    record_game_btn.textContent="Recording";
  }
  console.log(record)
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


// let timestamp = new Date().getTime();
const time = {timestamp: "", key:""}; //object
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
    }

    // If user key matches current target key then we increment
    if (app_mode === "game" && new_array[getActualPosition()] === e.key) {
      current_index++;
      score++;

      time.timestamp = Date.now();
      time.key = e.key;
      if (record === true) {
        game_record.push({...time});
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