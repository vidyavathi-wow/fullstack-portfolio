// routes/preferencesRoutes.js
const express = require('express');
const router = express.Router();
const {
  getPreferences,
  updatePreferences,
} = require('../controllers/preferencesController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, getPreferences);
router.put('/', verifyToken, updatePreferences);

module.exports = router;
