const express = require("express");
const app = express();

const quotes = [
  "Believe in yourself!",
  "Stay positive.",
  "Work hard, dream big."
];

app.get("/", (req, res) => {
  res.send("Quotes API is running!");
});

app.get("/api/random", (req, res) => {
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  res.json({ quote: random });
});

app.get("/api/all", (req, res) => {
  res.json(quotes);
});

// IMPORTANT: Render requires this
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
