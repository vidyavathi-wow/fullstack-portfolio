const express = require('express');
const app = express();
const port = 1000;

app.use(express.json());

const booksRouter = require('./routes/booksRouter.js');

app.use('/books', booksRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
