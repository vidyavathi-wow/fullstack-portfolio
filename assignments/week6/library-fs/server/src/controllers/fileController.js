// controllers/fileController.js
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const FileMeta = require('../models/FileMeta');
const { fileUpload } = require('../config/multerConfig');
const logger = require('../config/logger');

// Use your JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// =======================
// 📤 UPLOAD FILE
// =======================
exports.uploadFile = (io) => [
  fileUpload.single('file'),
  async (req, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });
      if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

      const meta = await FileMeta.create({
        userId,
        originalName: req.file.originalname,
        storedName: req.file.filename,
        mimeType: req.file.mimetype,
        size: req.file.size,
        path: `uploads/files/${req.file.filename}`,
      });

      io.to(`user:${userId}`).emit('notification', {
        type: 'file.uploaded',
        message: `Uploaded: ${meta.originalName}`,
        fileId: String(meta._id),
        at: new Date().toISOString(),
      });

      res.status(201).json(meta);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ success: false, message: err.message });
    }
  },
];

// =======================
// 📋 LIST FILES
// =======================
exports.listFiles = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const files = await FileMeta.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, files });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// =======================
// 🔗 GENERATE SECURE DOWNLOAD LINK
// =======================
exports.getDownloadLink = async (req, res) => {
  try {
    const userId = req.user?.id;
    const fileId = req.params.id;

    const meta = await FileMeta.findOne({ _id: fileId, userId });
    if (!meta) return res.status(404).json({ error: 'File not found' });

    // Generate short-lived token (valid for 60 seconds)
    const token = jwt.sign({ userId, fileId }, JWT_SECRET, { expiresIn: '1m' });

    const link = `${req.protocol}://${req.get('host')}/api/v1/files/${fileId}/direct-download?token=${token}`;
    res.json({ success: true, link });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// =======================
// ⬇️ DIRECT DOWNLOAD (PUBLIC LINK)
// =======================
exports.directDownload = (io) => async (req, res) => {
  try {
    const token = req.query.token;
    if (!token) return res.status(401).json({ success: false, message: 'Missing token' });

    // Verify the short-lived token
    const decoded = jwt.verify(token, JWT_SECRET);
    const { userId, fileId } = decoded;

    const meta = await FileMeta.findOne({ _id: fileId, userId });
    if (!meta) return res.status(404).json({ error: 'Not found' });

    const abs = path.join(__dirname, '..', meta.path);
    if (!fs.existsSync(abs)) return res.status(404).json({ error: 'File missing' });

    // ✅ Emit real-time notification
    io.to(`user:${userId}`).emit('notification', {
      type: 'file.downloaded',
      message: `Downloaded: ${meta.originalName}`,
      fileId: String(meta._id),
      at: new Date().toISOString(),
    });

    // Send file for download
    return res.download(abs, meta.originalName);
  } catch (err) {
    logger.error(err);
    res.status(401).json({ success: false, message: err.message });
  }
};

// =======================
// 🗑 DELETE FILE
// =======================
exports.deleteFile = (io) => async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const meta = await FileMeta.findOneAndDelete({ _id: req.params.id, userId });
    if (!meta) return res.status(404).json({ error: 'Not found' });

    const abs = path.join(__dirname, '..', meta.path);
    fs.unlink(abs, () => {});

    io.to(`user:${userId}`).emit('notification', {
      type: 'file.deleted',
      message: `Deleted: ${meta.originalName}`,
      fileId: String(meta._id),
      at: new Date().toISOString(),
    });

    res.json({ ok: true });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
