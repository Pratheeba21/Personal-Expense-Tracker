const API_URL = "http://localhost:3000/expenses";
let totalValue = 0;

const nameInput = document.getElementById("name");
const amtInput = document.getElementById("amt");
const totalDisplay = document.getElementById("total");
const listContainer = document.getElementById("list");


window.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch(API_URL);
  const expenses = await res.json();
  expenses.forEach((exp) => renderExpense(exp._id, exp.itemName, exp.amount));
});


document.getElementById("add").onclick = async () => {
  const itemName = nameInput.value;
  const amount = parseFloat(amtInput.value);

  if (!itemName || isNaN(amount)) {
    alert("Please enter valid details");
    return;
  }

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemName, amount }),
  });

  const newExpense = await res.json();
  renderExpense(newExpense._id, newExpense.itemName, newExpense.amount);

  nameInput.value = "";
  amtInput.value = "";
};


function renderExpense(id, name, price) {
  const li = document.createElement("li");
  li.innerHTML = `
        <span>${name}</span>
        <span>$${price.toFixed(2)} <button class="dlt-btn" data-id="${id}">X</button></span>
    `;


  totalValue += price;
  totalDisplay.innerText = `Total: $${totalValue.toFixed(2)}`;


  li.querySelector(".dlt-btn").onclick = async () => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    totalValue -= price;
    totalDisplay.innerText = `Total: $${totalValue.toFixed(2)}`;
    li.remove();
  };

  listContainer.appendChild(li);
}
