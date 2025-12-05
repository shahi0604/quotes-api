const express = require('express');
const app = express();

// Middleware to parse JSON (needed for POST requests later)
app.use(express.json());

// Sample quotes data
const quotes = [
  { id: 1, author: "Albert Einstein", quote: "Life is like riding a bicycle. To keep your balance you must keep moving." },
  { id: 2, author: "Oscar Wilde", quote: "Be yourself; everyone else is already taken." }
];

// Root route
app.get('/', (req, res) => {
  res.send('Quotes API is running!');
});

// Quotes route
app.get('/quotes', (req, res) => {
  res.json(quotes);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
