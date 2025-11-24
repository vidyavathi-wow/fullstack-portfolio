require('dotenv').config();
const express = require('express');
const cors = require("cors");
const corsOptions = require('./config/corsConfig');
const logger = require('./config/logger');
const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

const authRouter = require('./routes/authRouter');
const booksRouter = require('./routes/booksRouter');
const connectMongo = require('./db/Monogo');
const errorHandler = require('./config/errorHandler');

const mongoose = require('mongoose');  

const app = express();

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use(compression());
app.use(express.json({ limit: "1mb" }));

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));



app.get('/health', (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});


app.get('/health/db', async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.json({
      status: "DB OK",
      dbState: mongoose.connection.readyState,
    });
  } catch (error) {
    res.status(500).json({
      status: "DB DOWN",
      error: error.message,
    });
  }
});


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/books', booksRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => logger.info(`Server running at http://localhost:${PORT}`));
}

connectMongo();

module.exports = app;
