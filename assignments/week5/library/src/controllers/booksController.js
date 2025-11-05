const books = require("../utils/data.js");

exports.getBooks = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            data: books
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getBook = async (req, res) => {
    try {
        const book = books.find(b => b.id === parseInt(req.params.id));
        if (!book) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }
        return res.status(200).json({ success: true, data: book });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.addBook = async (req, res) => {
    try {
        const { title, genre, published_year, author } = req.body;
        if (!title || !author) {
            return res.status(400).json({ success: false, message: "Title and author are required" });
        }
        const newBook = {
            id: books.length ? books[books.length - 1].id + 1 : 1,
            title,
            genre: genre || "",
            published_year: published_year || null,
            author
        };
        books.push(newBook);
        return res.status(201).json({ success: true, data: newBook });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const index = books.findIndex(b => b.id === parseInt(req.params.id));
        if (index === -1) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }
        books[index] = { ...books[index], ...req.body };
        return res.status(200).json({ success: true, data: books[index] });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const index = books.findIndex(b => b.id === parseInt(req.params.id));
        if (index === -1) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }
        const deleted = books.splice(index, 1);
        return res.status(200).json({ success: true, data: deleted[0] });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
