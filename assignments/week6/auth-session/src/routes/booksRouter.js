const express = require('express');
const router = express.Router();
const bookController = require('../controllers/booksController.js');
const {
  validateBookCreation,
  validateBookIdParam,
} = require('../middlewares/validators/bookValidators.js');

router.get('/', bookController.getAllBooks);
router.get('/:id', validateBookIdParam, bookController.getBookById);
router.post('/', validateBookCreation, bookController.addBook);
router.put(
  '/:id',
  validateBookIdParam.concat(validateBookCreation),
  bookController.updateBook
);
router.delete('/:id', validateBookIdParam, bookController.deleteBook);

module.exports = router;
