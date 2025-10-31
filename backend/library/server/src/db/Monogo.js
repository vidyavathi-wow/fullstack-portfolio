const mongoose = require('mongoose');
const logger = require('../config/logger');

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    logger.info('✅ MongoDB connected');
  } catch (err) {
    logger.error('❌ MongoDB connection failed:', err.message);
  }
};

module.exports = connectMongo;
