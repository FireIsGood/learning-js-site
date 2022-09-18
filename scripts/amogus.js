// form fields
const form = document.querySelector(".form-data");
const inputName = document.querySelector(".input-name");
const inputID = document.querySelector(".input-id");

// results
const results = document.querySelector(".result");
const errors = document.querySelector(".errors");

const userName = document.querySelector(".user-name");
const userID = document.querySelector(".user-id");
const userSus = document.querySelector(".user-sus");
const clearBtn = document.querySelector(".clear-btn");

// Form listeners
form.addEventListener("submit", (e) => handleSubmit(e));
clearBtn.addEventListener("click", (e) => handleReset(e));

init();

// Initialize from local storage
function init() {
  let storedUser = localStorage.getItem("user");

  if (storedUser === null) {
    // if we don't have a user, show the form and hide the results
    form.classList.remove("hidden");
    results.classList.add("hidden");
  } else {
    // if we have a saved user, parse and show it
    storedUser = JSON.parse(storedUser);
    form.classList.add("hidden");
    results.classList.remove("hidden");
    displayUser(storedUser);
  }
}

function handleSubmit(e) {
  e.preventDefault();
  const suspicion = Math.floor(Math.random() * 100);
  console.log(suspicion);
  const inputDetails = {
    name: inputName.value,
    id: inputID.value,
    sus: suspicion,
  };
  console.log(inputDetails);
  localStorage.setItem("user", JSON.stringify(inputDetails));
  displayUser(inputDetails);
  init();
}

function handleReset(e) {
  localStorage.removeItem("user");
  init();
}

function displayUser(user) {
  userName.textContent = user.name;
  userID.textContent = user.id;
  userSus.textContent = user.sus;
}
