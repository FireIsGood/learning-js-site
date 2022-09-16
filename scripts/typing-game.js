// Load scores from local storage
let highScore = localStorage.getItem("highScore");

// The quotes to write
const QUOTES = [
  "Blaze, an elite Rhodes Island Operator, has demonstrated professional combat skills and tactical decision making in mobile operations, annihilation, and raids. Now commanded by Amiya, she is a staple for when battles get tough.",
  "Goldenglow, Rhodes Island Logistics Operator. Primary place of work is the Rhodes Island hair salon; under typical circumstances, is not dispatched in Field Operator capacity. Uses a specially designed staff, conducting attacks on the enemy via control of Driftbeacon Arts Units.",
  "Surtr is a mysterious Sarkaz girl who suffers from amnesia, perhaps due to her Oripathy. Her condition is rarely seen even among Infected. She is currently undergoing treatment at Rhodes Island. During testing, Surtr displayed an inexplicably high combat prowess, and was quickly drafted as a combat operator.",
  "A wandering monk from Higashi. Some holes in her background. Originally entered a Rhodes Island office by mistake; once inquiries showed she was interested in employment, she passed the exams and joined the company. Seems to have previously made links with Rhodes Island Operator Lava. Makes ample use of the naginata she carries with vigorous skill, and is active as a Vanguard Operator on the front lines.",
  "Maria Nearl, a young knight from Kazimierz and younger sister to Operator Nearl, has experience with knight sports and has demonstrated excellence in combat across a variety of tests. She now serves as a Defender Operator alongside Operator Nearl, as per her wishes.",
  "Exusiai is a citizen of Laterano and as such, is entitled to the privileges listed in Clauses 1-13 of the Laterano Constitution. She is an employee of Penguin Logistics who specializes in covert communication, armed escort, and other undercover activities. We suspect she is a Messenger. While contracted with Penguin Logistics, she serves as a liaison to Rhodes Island, assisting us with our operations.",
  "Thorns, a front-line combatant for Rhodes Island, is proficient in swordsmanship and pharmacology. Born in the Iberian hinterland, Thorns left his hometown in the midst of local religious strife. After leaving the Iberian region, he was invited to join Rhodes Island. The above section describing the situation in Iberia was self-reported by Thorns and has not been fully verified.",
  "The public face of Rhodes Island and its top executive. Although Amiya appears to be a young and inexperienced girl, she is universally trusted and highly qualified for her position. Amiya now leads Rhodes Island in fighting for the future of the Infected and striving to exorcise the dark shadow of Originium from the land.",
];
// Store words that the user will type
let words = [];
let wordIndex = 0;
// Test starting time
let startTime = Date.now();
// Page elements
const quoteElem = document.getElementById("quote");
const messageElem = document.getElementById("message");
const typedValueElem = document.getElementById("typed-value");
const highScoreElem = document.getElementById("high-score");

typedValueElem.disabled = true;
quoteElem.classList.add("prepare");
quoteElem.innerHTML = "Click <strong>start</strong> to begin!";

if (highScore !== null) {
  highScoreElem.innerText = `Your high score: ${highScore} seconds`;
}

// || Game Logic ||
document.getElementById("start").addEventListener("click", () => {
  const quoteIndex = Math.floor(Math.random() * QUOTES.length);
  const quote = QUOTES[quoteIndex];
  words = quote.split(" ");
  wordIndex = 0;

  // Update UI
  const spanWords = words.map((word) => `<span>${word}</span>`);
  quoteElem.innerHTML = spanWords.join(" ");
  quoteElem.classList.remove("victory");

  // Highlight first word
  quoteElem.childNodes[0].className = "highlight";
  // Clear old messages
  messageElem.innerText = "";

  // Set up text box by clearing, then set focus
  typedValueElem.className = "";
  typedValueElem.disabled = false;
  typedValueElem.value = "";
  typedValueElem.focus();

  // Set up the event handler
  typedValueElem.disabled = false;

  // Start the timer
  startTime = new Date().getTime();
});

typedValueElem.addEventListener("input", () => {
  // Get current word
  const currentWord = words[wordIndex];
  // Get current value
  const typedValue = typedValueElem.value;

  // Win checker, if word is correct and the last one then win
  if (typedValue === currentWord && wordIndex === words.length - 1) {
    quoteElem.childNodes[wordIndex * 2].className = "";
    // End of string, display success
    typedValueElem.value = "";
    const elapsedTime = new Date().getTime() - startTime;
    const currentTime = elapsedTime / 1000;
    const wordsPerMinute =
      (Math.floor((words.length / currentTime) * 1000) * 60) / 1000;
    const message = `You finished ${words.length} words in ${currentTime} seconds. That's ${wordsPerMinute} words per minute!`;
    messageElem.innerText = message;
    quoteElem.classList.add("victory");
    typedValueElem.className = "";
    typedValueElem.disabled = true;
    typedValueElem.blur();
    if (highScore > currentTime || highScore === null) {
      localStorage.setItem("highScore", currentTime);
      highScoreElem.innerText = `Your high score: ${currentTime} seconds`;
    }
  } else if (typedValue.endsWith(" ") && typedValue.trim() === currentWord) {
    // Current word is correct, highlight next word
    typedValueElem.className = "";
    typedValueElem.value = "";
    quoteElem.childNodes[wordIndex * 2].className = "";
    wordIndex++;
    quoteElem.childNodes[wordIndex * 2].className = "highlight";
  } else if (
    typedValue.length <= currentWord.length &&
    typedValue.length > 0 &&
    typedValue === [...currentWord].splice(0, typedValue.length).join("")
  ) {
    typedValueElem.className = "checking";
  } else if (typedValue.length === 0) {
    typedValueElem.className = "";
  } else {
    // Error state
    typedValueElem.className = "error";
  }
});
