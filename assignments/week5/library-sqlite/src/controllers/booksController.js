const Database = require('better-sqlite3');
const db = new Database('./library.db');

db.prepare(
  `CREATE TABLE IF NOT EXISTS Books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT,
    genre TEXT,
    published_year INTEGER
)`
).run();

exports.getBooks = (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM Books').all();
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBook = (req, res) => {
  try {
    const book = db
      .prepare('SELECT * FROM Books WHERE id = ?')
      .get(req.params.id);
    if (!book)
      return res
        .status(404)
        .json({ success: false, message: 'Book not found' });
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addBook = (req, res) => {
  try {
    const { title, author, genre, published_year } = req.body;
    if (!title || !author) {
      return res
        .status(400)
        .json({ success: false, message: 'Title and author are required' });
    }
    const stmt = db.prepare(
      'INSERT INTO Books (title, author, genre, published_year) VALUES (?, ?, ?, ?)'
    );
    const info = stmt.run(title, author, genre, published_year);
    res.status(201).json({
      success: true,
      data: { id: info.lastInsertRowid, title, author, genre, published_year },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateBook = (req, res) => {
  try {
    const { title, author, genre, published_year } = req.body;
    const stmt = db.prepare(
      'UPDATE Books SET title = ?, author = ?, genre = ?, published_year = ? WHERE id = ?'
    );
    const info = stmt.run(title, author, genre, published_year, req.params.id);
    if (info.changes === 0)
      return res
        .status(404)
        .json({ success: false, message: 'Book not found' });
    res
      .status(200)
      .json({ success: true, message: 'Book updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteBook = (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM Books WHERE id = ?');
    const info = stmt.run(req.params.id);
    if (info.changes === 0)
      return res
        .status(404)
        .json({ success: false, message: 'Book not found' });
    res
      .status(200)
      .json({ success: true, message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
