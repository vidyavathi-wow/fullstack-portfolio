require('dotenv').config();
const express = require('express');
const booksRouter = require('./routes/booksRouter.js');

const app = express();

app.use(express.json());

app.use('/api/books', booksRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server started running at http://localhost:${port}`);
});
