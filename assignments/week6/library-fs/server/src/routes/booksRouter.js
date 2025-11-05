const express = require('express');
const router = express.Router();
const bookController = require('../controllers/booksController.js');
const {
  validateBookCreation,
  validateBookIdParam,
} = require('../middlewares/validators/bookValidators.js');
const verifyToken = require('../middlewares/verifyToken.js');

router.get('/', verifyToken, bookController.getAllBooks);
router.get(
  '/:id',
  verifyToken,
  validateBookIdParam,
  bookController.getBookById
);
router.post('/', verifyToken, validateBookCreation, bookController.addBook);
router.put(
  '/:id',
  verifyToken,
  [...validateBookIdParam, ...validateBookCreation],
  bookController.updateBook
);
router.delete(
  '/:id',
  verifyToken,
  validateBookIdParam,
  bookController.deleteBook
);

module.exports = router;
