const cardGrid = document.querySelector(".card-grid");
const cardTemplate = document.getElementById("card-template");
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
    addCard(cardTemplate);
    parentCard.remove();
  }, 400);
}

function addCard(template) {
  const newCardTemplate = template.content.cloneNode(true);
  const card = newCardTemplate.querySelector(".card");
  const cardTitle = card.querySelector(".card-header");
  const cardText = card.querySelector(".card-body");
  const randomColor = Math.floor(360 * Math.random());
  card.style.setProperty("--card-hue", randomColor);

  const postID = Math.floor(Math.random() * 100);
  fetch(`https://jsonplaceholder.typicode.com/posts/${postID}`)
    .then((result) => result.json())
    .then((result) => {
      cardTitle.textContent += `Generated Card #${postID}`;
      cardText.textContent = result.body;
    });

  cardGrid.append(card);
}

addGlobalEventListener("click", ".card-button", removeCard);
for (let i = 0; i < 20; i++) {
  addCard(cardTemplate);
}

addGlobalEventListener("click", "#sidebar-toggle", (e) => {
  e.preventDefault();
  sidebar.classList.toggle("js-show");
});
