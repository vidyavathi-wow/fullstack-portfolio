require("dotenv").config();
const express = require("express");
const booksRouter = require("./routes/booksRouter.js");
const pool = require("./utils/db.js");

const app = express();
app.use(express.json());

const createTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS books (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        author TEXT,
        genre TEXT,
        published_year INT
      )
    `);
    // console.log("Books table is ready");
  } catch (error) {
    // console.error("Error creating books table:", error.message);
  }
};

app.use("/books", booksRouter);

const port = process.env.PORT || 5000;

createTable().then(() => {
  app.listen(port, () => {
    // console.log(`Server started running at http://localhost:${port}`);
  });
});
