require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig.development);

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/api/transactions", async (req, res) => {
  try {
    const transaction = await knex("transactions").select("*");
    res.status(200).json({ message: "transaction data", data: transaction });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error fetching transaction", error: error.message });
  }
});

app.post("/api/transactions", async (req, res) => {
  const { type, description, amount, date } = req.body;
  if (!type || !description || !amount || !date) {
    return res.status(400).json({ message: "Unvalid request body" });
  }
  try {
    const [id] = await knex("transactions")
      .insert({
        type,
        description,
        amount,
        date,
      })
      .returning("id");
    res.status(201).json({
      message: "successfully added transaction",
      data: id,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error adding transaction", error: error.message });
  }
});
app.listen(PORT, () => {
  console.log(`Finance Tracker API running on ${HOST}:${PORT}`);
});
