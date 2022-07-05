import boom from "./sounds/boom.wav";
import clap from "./sounds/clap.wav";
import hi_hat from "./sounds/hi_hat.wav";
import kick from "./sounds/kick.wav";
import open_hat from "./sounds/open_hat.wav";
import ride from "./sounds/ride.wav";
import snare from "./sounds/snare.wav";
import tink from "./sounds/tink.wav";
import tom from "./sounds/tom.wav";

// const boom_element = document.getElementById("boom");
// const clap_element = document.getElementById("clap");
// const hi_hat_element = document.getElementById("hi_hat");
// const kick_element = document.getElementById("kick");
// const open_hat_element = document.getElementById("open_hat");
// const ride_element = document.getElementById("ride");
// const snare_element = document.getElementById("snare");
// const tink_element = document.getElementById("tink");
// const tom_element = document.getElementById("tom");

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

// map returns a MODIFIED COPY of the array without affecting original array
// forEach only returns the ORIGINAL array

// normal function(){} is reusable
// arrow funtions(()=>{}) is one-time

// <div id="boom" class="card control">
//     <div class="label container">Boom</div>
//     <div class="key container">A</div>
// </div>

const parent = document.getElementById("controls");
key_config.forEach((k) => {
  // { id: "boom", key: "a", sound: boom },
  const control_div = document.createElement("div");
  control_div.setAttribute("id", k.id);
  control_div.setAttribute("key", k.key);
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
    if (e.key === k.key) {
      const audio = new Audio(k.sound);
      audio.play();
    }
  });
});

// long-way of adding audio
// boom_element.addEventListener("click", (e) => {
//     const audio = new Audio(boom);
//     audio.play();
// });

// clap_element.addEventListener("click", (e) => {
//     const audio = new Audio(clap);
//     audio.play();
// });

// hi_hat_element.addEventListener("click", (e) => {
//     const audio = new Audio(hi_hat);
//     audio.play();
// });

// kick_element.addEventListener("click", (e) => {
//     const audio = new Audio(kick);
//     audio.play();
// });

// open_hat_element.addEventListener("click", (e) => {
//     const audio = new Audio(open_hat);
//     audio.play();
// });

// ride_element.addEventListener("click", (e) => {
//     const audio = new Audio(ride);
//     audio.play();
// });

// snare_element.addEventListener("click", (e) => {
//     const audio = new Audio(snare);
//     audio.play();
// });

// tink_element.addEventListener("click", (e) => {
//     const audio = new Audio(tink);
//     audio.play();
// });

// tom_element.addEventListener("click", (e) => {
//     const audio = new Audio(tom);
//     audio.play();
// });
