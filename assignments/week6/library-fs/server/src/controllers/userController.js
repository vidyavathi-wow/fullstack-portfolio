
const path = require('path');
const fs = require('fs');
const db = require('../utils/db');
const { avatarUpload } = require('../config/multerConfig');
const logger=require("../config/logger")
exports.uploadAvatar = (io) => [
  avatarUpload.single('avatar'),
  async (req, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });
      if (!req.file) return res.status(400).json({ error: 'No file provided' });

      const avatarUrl = `/uploads/avatars/${req.file.filename}`;

      
      const user = await db('users').where({ id: userId }).first();
      if (user?.avatar_url) {
        const oldPath = path.join(__dirname, '..', user.avatar_url);
        fs.unlink(oldPath, () => {});
      }

      
      await db('users').where({ id: userId }).update({ avatar_url: avatarUrl });

      
      io.to(`user:${userId}`).emit('notification', {
        type: 'avatar.updated',
        message: 'Profile picture updated',
        avatarUrl,
        at: new Date().toISOString(),
      });

      return res.json({ avatarUrl });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({success:false,message:err.message });
    }
  },
];


exports.deleteAvatar = (io) => async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const user = await db('users').where({ id: userId }).first();
    if (user?.avatar_url) {
      const avatarPath = path.join(__dirname, '..', user.avatar_url);
      fs.unlink(avatarPath, () => {});
    }

    await db('users').where({ id: userId }).update({ avatar_url: null });

    io.to(`user:${userId}`).emit('notification', {
      type: 'avatar.removed',
      message: 'Profile picture removed',
      at: new Date().toISOString(),
    });

    res.json({ ok: true });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: 'Failed to remove avatar' });
  }
};
