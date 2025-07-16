const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";
app.use(express.json());
app.get("/", (req, res) => {
  res.end("wellcome to Finance Tracker API");
});
app.get("/api/transactions", (req, res) => {
  const transaction = [
    {
      id: 1,
      type: "Income",
      description: "Salary",
      amount: 5000000,
      date: "2025-07-01",
    },
    {
      id: 2,
      type: "Expenses",
      description: "Groceries",
      amount: 600000,
      date: "2025-07-03",
    },
    {
      id: 3,
      type: "Income",
      description: "Freelance Work",
      amount: 850000,
      date: "2025-07-05",
    },
  ];
  res.status(200).json({ message: "transaction data", data: transaction });
});

app.post("/api/transactions", (req, res) => {
  const newTransaction = req.body;
  console.log("body: ", newTransaction);
  res
    .status(201)
    .json({ message: "successfully added transaction", data: newTransaction });
});
app.listen(PORT, () => {
  console.log(`Finance Tracker API running on ${HOST}:${PORT}`);
});
