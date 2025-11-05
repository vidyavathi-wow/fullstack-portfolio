// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const corsOptions = require('./config/corsConfig');
const logger = require('./config/logger');
const authRouter = require('./routes/authRouter');
const booksRouter = require('./routes/booksRouter');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.options('/', cors(corsOptions));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/books', booksRouter);

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () =>
    logger.info(`Server running at http://localhost:${PORT}`)
  );
}

module.exports = app;
