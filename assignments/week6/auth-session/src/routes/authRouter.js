const express = require('express');
const { login, register, logout } = require('../controllers/auhtController');
const {
  validateUserRegistration,
  validateUserLogin,
} = require('../middlewares/validators/authValidators');

const router = express.Router();

router.post('/login', validateUserLogin, login);
router.post('/register', validateUserRegistration, register);
router.post('/logout', logout);

module.exports = router;
