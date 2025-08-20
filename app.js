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
    console.log("evenet : ", event.submitter.dataset.action);
  });

  return $form;
}

ToppingForm();

// =============== RENDER ===============
function render() {
  const $root = document.querySelector("#root");
  $root.innerHTML = `
    <h1>Pizza Topping Sorter</h1>
    <ToppingForm></ToppingForm>
  `;

  $root.querySelector("ToppingForm").replaceWith(ToppingForm());
}

render();
