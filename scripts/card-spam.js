const cardGrid = document.querySelector(".card-grid");
const cardTemplateStarter = document.getElementById("card-template-starter");
const cardTemplateReplacement = document.getElementById("card-template");
// let cards = document.querySelectorAll(".card");
const sidebarToggle = document.getElementById("sidebar-toggle");
const sidebar = document.querySelector(".sidebar");

function addGlobalEventListener(type, selector, callback) {
  document.addEventListener(type, (e) => {
    if (e.target.matches(selector)) callback(e);
  });
}

function removeCard(e) {
  e.preventDefault();
  e.stopPropagation();
  const parentCard = e.target.closest(".card");
  parentCard.classList.add("js-destroy");
  setTimeout(() => {
    addCard(cardTemplateReplacement);
    parentCard.remove();
  }, 400);
}

function addCard(template) {
  const newCardTemplate = template.content.cloneNode(true);
  const card = newCardTemplate.querySelector(".card");
  const cardText = card.querySelector(".card-body");
  const randomColor = Math.floor(360 * Math.random());
  card.style.setProperty("--card-hue", randomColor);
  let stringMod = "";
  for (let a = 0; a < Math.floor(Math.random() * 30); a++) {
    stringMod += "extra ";
  }
  cardText.textContent += stringMod;
  cardGrid.append(card);
}

addGlobalEventListener("click", ".card-button", removeCard);
for (let i = 0; i < 20; i++) {
  addCard(cardTemplateStarter);
}

addGlobalEventListener("click", "#sidebar-toggle", (e) => {
  e.preventDefault();
  sidebar.classList.toggle("js-show");
});
