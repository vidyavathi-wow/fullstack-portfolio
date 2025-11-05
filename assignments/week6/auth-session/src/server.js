require('dotenv').config();
const express = require('express');
const booksRouter = require('./routes/booksRouter.js');
const session = require('express-session');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const authRouter = require('./routes/authRouter.js');
const initTables = require('./db/initTables.js');

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

app.use('/api/auth', authRouter);
app.use('/api/book', booksRouter);

const PORT = process.env.PORT || 5000;

initTables().then(() => {
  app.listen(PORT, () =>
    console.log(`Server running at http://localhost:${PORT}`)
  );
});
