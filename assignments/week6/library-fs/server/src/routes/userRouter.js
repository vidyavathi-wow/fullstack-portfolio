// routes/userRouter.js
const express = require('express');
const { uploadAvatar, deleteAvatar } = require('../controllers/userController');
const verifyToken=require("../middlewares/verifyToken")
module.exports = (io) => {
  const router = express.Router();

  router.post('/me/avatar',verifyToken,uploadAvatar(io)); 
  router.delete('/me/avatar', deleteAvatar(io)); 

  return router;
};
