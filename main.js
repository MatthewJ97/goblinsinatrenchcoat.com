// Poke the trenchcoat: it wobbles and says something suspiciously human.
const coat = document.getElementById("coat");
const bubble = document.getElementById("bubble");
const lines = [
  "Hello, fellow human.",
  "Nothing to see here.",
  "We are one tall man.",
  "Stop poking the coat.",
  "Who said that? Not us.",
  "Ow. I mean: ow, singular.",
  "The ears are a hat.",
  "Please enjoy this website.",
];
// Lines for when the fourth goblin pops out of the pocket.
const pocketLines = [
  "Get back in the pocket!",
  "There are three of us. Normal amount.",
  "You didn't see that.",
  "That's a pocket hamster.",
];
let lineIndex = 0;
let pocketTimer;

coat.addEventListener("click", () => {
  lineIndex = (lineIndex + 1) % lines.length;
  bubble.textContent = Math.random() < 0.5
    ? pocketLines[Math.floor(Math.random() * pocketLines.length)]
    : lines[lineIndex];

  coat.classList.add("popped");
  clearTimeout(pocketTimer);
  pocketTimer = setTimeout(() => coat.classList.remove("popped"), 1800);
  bubble.classList.remove("pop");
  coat.classList.remove("shake");
  void coat.offsetWidth; // restart the animations
  bubble.classList.add("pop");
  coat.classList.add("shake");
});
coat.addEventListener("animationend", (e) => {
  if (e.animationName === "shake") coat.classList.remove("shake");
});

// A goblin occasionally peeks up from the bottom of the screen. Spot it for points.
const peeker = document.getElementById("peeker");
const spotted = document.getElementById("spotted");
const peekerImg = peeker.querySelector("img");
const faces = ["images/goblin-startled.png", "images/goblin-brooder.png", "images/goblin-charmer.png", "images/goblin-grinner.png"];
let count = 0;
let hideTimer;

function peek() {
  peekerImg.src = faces[Math.floor(Math.random() * faces.length)];
  peeker.style.right = `${4 + Math.random() * 70}vw`;
  peeker.classList.remove("caught");
  peeker.classList.add("up");
  hideTimer = setTimeout(() => {
    peeker.classList.remove("up");
    scheduleNext();
  }, 2200);
}
function scheduleNext() {
  setTimeout(peek, 5000 + Math.random() * 9000);
}
peeker.addEventListener("click", () => {
  if (!peeker.classList.contains("up")) return;
  clearTimeout(hideTimer);
  count += 1;
  spotted.textContent = count;
  peeker.classList.remove("up");
  peeker.classList.add("caught");
  scheduleNext();
});
scheduleNext();

// Placeholder sign-up: nothing is sent anywhere yet.
const form = document.getElementById("signup");
const email = document.getElementById("email");
const msg = document.getElementById("form-msg");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!email.checkValidity() || !email.value) {
    msg.textContent = "That doesn't look like an email. Even a goblin can tell.";
    msg.classList.add("err");
    return;
  }
  msg.classList.remove("err");
  msg.textContent = "Noted. A goblin has scrawled this on the inside of the coat.";
  form.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();
