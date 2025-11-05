const express = require("express");
const db = new Database("./library.db");
const app = express();
const port = 1000;

app.use(express.json());

db.prepare(`CREATE TABLE IF NOT EXISTS Books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT,
    genre TEXT,
    published_year INTEGER
)`).run();

const booksRouter = require("./routes/booksRouter.js");

app.use("/books", booksRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
