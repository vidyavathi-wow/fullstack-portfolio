require('dotenv').config();
const express = require('express');
const booksRouter = require('./routes/booksRouter.js');
const db = require('./utils/db.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 5000;

const createBooksTable = async () => {
  const exists = await db.schema.hasTable('books');
  if (!exists) {
    await db.schema.createTable('books', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.string('author');
      table.string('genre');
      table.integer('published_year');
    });
    console.log('Books table created');
  } else {
    console.log('Books table already exists');
  }
};

createBooksTable()
  .then(() => {
    app.use('/books', booksRouter);

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error creating table:', err.message);
    process.exit(1);
  });
