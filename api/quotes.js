const express = require('express');
const app = express();

app.use(express.json()); // to parse JSON body

// Sample in-memory quotes
let quotes = [
  { id: 1, author: "Albert Einstein", quote: "Life is like riding a bicycle. To keep your balance you must keep moving." },
  { id: 2, author: "Oscar Wilde", quote: "Be yourself; everyone else is already taken." }
];

// Root route
app.get('/', (req, res) => {
  res.send('Quotes API is running!');
});

// GET all quotes
app.get('/quotes', (req, res) => {
  res.json(quotes);
});

// GET a single quote by ID
app.get('/quotes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const quote = quotes.find(q => q.id === id);
  if (quote) {
    res.json(quote);
  } else {
    res.status(404).json({ message: "Quote not found" });
  }
});

// POST a new quote
app.post('/quotes', (req, res) => {
  const { author, quote } = req.body;
  if (!author || !quote) {
    return res.status(400).json({ message: "Author and quote are required" });
  }
  const newQuote = {
    id: quotes.length ? quotes[quotes.length - 1].id + 1 : 1,
    author,
    quote
  };
  quotes.push(newQuote);
  res.status(201).json(newQuote);
});

// PUT (update) a quote by ID
app.put('/quotes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { author, quote } = req.body;
  const index = quotes.findIndex(q => q.id === id);
  if (index !== -1) {
    if (author) quotes[index].author = author;
    if (quote) quotes[index].quote = quote;
    res.json(quotes[index]);
  } else {
    res.status(404).json({ message: "Quote not found" });
  }
});

// DELETE a quote by ID
app.delete('/quotes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = quotes.findIndex(q => q.id === id);
  if (index !== -1) {
    const deletedQuote = quotes.splice(index, 1);
    res.json(deletedQuote[0]);
  } else {
    res.status(404).json({ message: "Quote not found" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
