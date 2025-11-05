const pool = require("../utils/db.js");

exports.getAllBooks = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM books");
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No books found"
      });
    }
    return res.status(200).json({
      success: true,
      books: result.rows
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      });
    }
    return res.status(200).json({
      success: true,
      book: result.rows[0]
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.addBook = async (req, res) => {
  const { title, genre, published_year, author } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO books (title, genre, published_year, author) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, genre, published_year, author]
    );
    return res.status(201).json({
      success: true,
      message: "Book added successfully",
      book: result.rows[0]
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, genre, published_year, author } = req.body;
  try {
    const result = await pool.query(
      "UPDATE books SET title=$1, genre=$2, published_year=$3, author=$4 WHERE id=$5 RETURNING *",
      [title, genre, published_year, author, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Book updated successfully",
      book: result.rows[0]
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM books WHERE id=$1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Book deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
