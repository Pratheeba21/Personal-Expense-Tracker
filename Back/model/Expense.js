const mongoose = require("mongoose");
const ExpenseSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  amount: { type: Number, required: true },
});
module.exports = mongoose.model("Expense", ExpenseSchema);
