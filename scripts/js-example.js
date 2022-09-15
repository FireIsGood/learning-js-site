function createParagraph() {
  const para = document.createElement("p");
  para.textContent = "You clicked the button!";
  document.body.appendChild(para);
}

const gamingButton = document.querySelectorAll("button#gaming");

for (const button of gamingButton) {
  button.addEventListener("click", createParagraph);
}
