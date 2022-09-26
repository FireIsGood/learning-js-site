const cardGrid = document.querySelector(".card-grid");
const cardTemplateStarter = document.getElementById("card-template-starter");
const cardTemplateReplacement = document.getElementById("card-template");
// let cards = document.querySelectorAll(".card");

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
    parentCard.remove();
    addCard(cardTemplateReplacement);
  }, 400);
}

function addCard(template) {
  const newCard = template.content.cloneNode(true);
  cardGrid.append(newCard);
}

addGlobalEventListener("click", ".card-button", removeCard);
for (let i = 0; i < 5; i++) {
  addCard(cardTemplateStarter);
}
