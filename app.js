// =============== STATE ===============
const toppings = [];
const veggies = [];
const meats = [];
const others = [];

const veggieList = ["mushroom", "onion", "pepper", "olive", "spinach"];
const meatList = ["pepperoni", "bacon", "sausage", "ham", "chicken"];

// =============== STATE LOGIC ===============
function addToppings(topping) {
  toppings.push(topping);
  render(); // Update the UI
}

function sortToppings(topping) {
  if (veggieList.includes(topping)) {
    veggies.push(topping);
  } else if (meatList.includes(topping)) {
    meats.push(topping);
  } else {
    others.push(topping);
  }
}

function sortOne() {
  //Using sortToppings sort first item on toppingList
  if (toppings.length === 0) {
    //If list is empty exist function
    return;
  }
  sortToppings(toppings.shift());
  render();
}

function sortAll() {
  while (toppings.length > 0) {
    sortToppings(toppings.shift());
  }
  render();
}

// =============== COMPONENTS / DISPLAY ===============
function ToppingForm() {
  // Create the form tag/element
  const $form = document.createElement("form");

  $form.innerHTML = `
    <label>
      Add a Pizza Topping
      <input name="topping" type="text" placeholder="Add Topping" />
    </label>
    <button type="submit" data-action="add">Add Topping</button>
    <button type="submit" data-action="sortOne">Sort One</button>
    <button type="submit" data-action="sortAll">Sort All</button>
  `;

  // Add Listener to respond to interactions
  $form.addEventListener("submit", function (event) {
    // Prevent the page from refreshing / default action
    event.preventDefault();
    // Storing users action ** data-action - fro innerHTML
    const action = event.submitter.dataset.action;
    const data = new FormData($form);
    // Storing users inputted topping
    const userInputtedTopping = data.get("topping").trim().toLowerCase();

    // Button Logic
    if (action === "add" && userInputtedTopping !== "") {
      addToppings(userInputtedTopping);
    } else if (action === "sortOne") {
      sortOne();
    } else if (action === "sortAll") {
      sortAll();
    }
  });

  return $form;
}

function ToppingGroup(label, items) {
  const $section = document.createElement("section");
  $section.innerHTML = `
    <h2>${label}</h2>
    <ul></ul>
  `;
  const $ul = $section.querySelector("ul");

  items.forEach((item) => {
    const $li = document.createElement("li");
    $li.textContent = item;
    $ul.appendChild($li);
  });

  return $section;
}

ToppingForm();

// =============== RENDER ===============
function render() {
  const $root = document.querySelector("#root");
  $root.innerHTML = `
    <h1>Pizza Topping Sorter</h1>
    <ToppingForm></ToppingForm>
    <ToppingGroup id="list"></ToppingGroup>
    <ToppingGroup id="veggie"></ToppingGroup>
    <ToppingGroup id="meat"></ToppingGroup>
    <ToppingGroup id="others"></ToppingGroup>
  `;

  $root.querySelector("ToppingForm").replaceWith(ToppingForm());
  $root.querySelector("ToppingGroup#list").replaceWith(ToppingGroup("ToppingList", toppings));
  $root.querySelector("ToppingGroup#veggie").replaceWith(ToppingGroup("Veggies", veggies));
  $root.querySelector("ToppingGroup#meat").replaceWith(ToppingGroup("Meats", meats));
  $root.querySelector("ToppingGroup#others").replaceWith(ToppingGroup("Others", others));
}

render();
