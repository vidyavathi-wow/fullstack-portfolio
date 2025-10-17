const { body, param, validationResult } = require('express-validator');

exports.validateBookCreation = [
  body('title').isString().notEmpty().withMessage('Title is required'),
  body('author').optional().isString(),
  body('genre').optional().isString(),
  body('published_year')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Published year must be a positive integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ success: false, errors: errors.array() });
    next();
  },
];

exports.validateBookIdParam = [
  param('id').isInt().withMessage('Book ID must be an integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ success: false, errors: errors.array() });
    next();
  },
];
