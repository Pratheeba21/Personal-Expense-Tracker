// const API_URL = "https://personal-expense-tracker-backend-zint.onrender.com/expenses";
// let totalValue = 0;

// const nameInput = document.getElementById("name");
// const amtInput = document.getElementById("amt");
// const totalDisplay = document.getElementById("total");
// const listContainer = document.getElementById("list");

// window.addEventListener("DOMContentLoaded", async () => {
//   const res = await fetch(API_URL);
//   const expenses = await res.json();
//   expenses.forEach((exp) => renderExpense(exp._id, exp.itemName, exp.amount));
// });

// document.getElementById("add").onclick = async () => {
//   const itemName = nameInput.value;
//   const amount = parseFloat(amtInput.value);

//   if (!itemName || isNaN(amount)) {
//     alert("Please enter valid details");
//     return;
//   }

//   const res = await fetch(API_URL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ itemName, amount }),
//   });

//   const newExpense = await res.json();
//   renderExpense(newExpense._id, newExpense.itemName, newExpense.amount);

//   nameInput.value = "";
//   amtInput.value = "";
// };

// function renderExpense(id, name, price) {
//   const li = document.createElement("li");
//   li.innerHTML = `
//         <span>${name}</span>
//         <span>$${price.toFixed(2)} <button class="dlt-btn" data-id="${id}">X</button></span>
//     `;

//   totalValue += price;
//   totalDisplay.innerText = `Total: $${totalValue.toFixed(2)}`;

//   li.querySelector(".dlt-btn").onclick = async () => {
//     await fetch(`${API_URL}/${id}`, { method: "DELETE" });
//     totalValue -= price;
//     totalDisplay.innerText = `Total: $${totalValue.toFixed(2)}`;
//     li.remove();
//   };

//   listContainer.appendChild(li);
// }

const nameInput = document.getElementById("name");
const amtInput = document.getElementById("amt");
const add_btn = document.getElementById("add");
const totalDisplay = document.getElementById("total");
const listContainer = document.getElementById("list");

const API_URL =
  "https://personal-expense-tracker-backend-zint.onrender.com/expenses";
let totalValue = 0;

// 1. Load expenses from DB on startup
window.addEventListener("DOMContentLoaded", function () {
  fetch(API_URL)
    .then((res) => res.json())
    .then((expenses) => {
      expenses.forEach((exp) => {
        create_expense_item(exp._id, exp.itemName, exp.amount);
      });
    });
});

// 2. Add Expense to DB and UI
add_btn.addEventListener("click", function () {
  const itemName = nameInput.value;
  const amount = parseFloat(amtInput.value);

  if (itemName === "" || isNaN(amount)) {
    alert("Please enter valid details");
    return;
  }

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemName: itemName, amount: amount }),
  })
    .then((res) => res.json())
    .then((newExpense) => {
      create_expense_item(
        newExpense._id,
        newExpense.itemName,
        newExpense.amount,
      );
      nameInput.value = "";
      amtInput.value = "";
    });
});

// 3. Simplified Create/Render Function
function create_expense_item(id, name, price) {
  const li = document.createElement("li");

  const name_span = document.createElement("span");
  name_span.textContent = name;

  const right_container = document.createElement("span");
  right_container.textContent = `$${price.toFixed(2)} `;

  const dlt_btn = document.createElement("button");
  dlt_btn.className = "dlt-btn";
  dlt_btn.textContent = "X";

  // Update Total Value (Addition)
  totalValue += price;
  totalDisplay.innerText = `Total: $${totalValue.toFixed(2)}`;

  // DELETE Logic
  dlt_btn.addEventListener("click", function () {
    fetch(API_URL + "/" + id, {
      method: "DELETE",
    }).then(() => {
      // Update Total Value (Subtraction)
      totalValue -= price;
      totalDisplay.innerText = `Total: $${totalValue.toFixed(2)}`;

      // Remove from UI
      listContainer.removeChild(li);
    });
  });

  // Assemble the list item
  right_container.appendChild(dlt_btn);
  li.appendChild(name_span);
  li.appendChild(right_container);

  // Add to the main list
  listContainer.appendChild(li);
}