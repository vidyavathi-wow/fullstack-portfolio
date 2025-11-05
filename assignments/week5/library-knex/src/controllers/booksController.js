const db = require("../utils/db.js")

exports.getAllBooks = async (req, res) => {
  try {
    const books = await db("books").select("*");
    if (books.length === 0) {
      return res.status(404).json({ success: false, message: "No books found" });
    }
    res.json({ success: true, books });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await db("books").where({ id }).first();
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }
    res.json({ success: true, book });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.addBook = async (req, res) => {
  const { title, author, genre, published_year } = req.body;
  try {
    const [book] = await db("books")
      .insert({ title, author, genre, published_year })
      .returning("*");
    res.status(201).json({ success: true, message: "Book added", book });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, published_year } = req.body;
  try {
    const [book] = await db("books")
      .where({ id })
      .update({ title, author, genre, published_year })
      .returning("*");
    if (!book) return res.status(404).json({ success: false, message: "Book not found" });
    res.json({ success: true, message: "Book updated", book });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const [book] = await db("books").where({ id }).del().returning("*");
    if (!book) return res.status(404).json({ success: false, message: "Book not found" });
    res.json({ success: true, message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
