// routes/fileRouter.js
const express = require('express');
const {
  uploadFile,
  listFiles,
  getDownloadLink,
  directDownload,
  deleteFile
} = require('../controllers/fileController');
const verifyToken = require('../middlewares/verifyToken');

module.exports = (io) => {
  const router = express.Router();

  // Protected routes (require Authorization header)
  router.post('/', verifyToken, uploadFile(io));
  router.get('/', verifyToken, listFiles);
  router.get('/:id/download-link', verifyToken, getDownloadLink);
  router.delete('/:id', verifyToken, deleteFile(io));

  // ⚠️ Unprotected: uses short-lived ?token= query param
  router.get('/:id/direct-download', directDownload(io));

  return router;
};
