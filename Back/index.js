const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Expense = require("./model/Expense"); // Ensure this file exists!

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/expenseDB")
  .then(() => console.log("MongoDB Connected for Expenses!"))
  .catch((err) => console.log(err));

// Routes
app.get("/expenses", async (req, res) => {
  const data = await Expense.find();
  res.json(data);
});

app.post("/expenses", async (req, res) => {
  const entry = new Expense({
    itemName: req.body.itemName,
    amount: req.body.amount,
  });
  await entry.save();
  res.json(entry);
});

app.delete("/expenses/:id", async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(3000, () => console.log("Expense Server running on port 3000"));
