function flipCard() {
  this.classList.toggle("card-flip");
}

const buttons = document.querySelectorAll(".card");

for (const button of buttons) {
  button.addEventListener("click", flipCard);
}
