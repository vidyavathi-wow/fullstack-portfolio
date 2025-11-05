const db = require('../utils/db');

async function createUsersTable() {
  const exists = await db.schema.hasTable('users');
  if (!exists) {
    await db.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('email').notNullable().unique();
      table.string('password_hash').notNullable();
      table.string('name');
      table.timestamp('created_at').defaultTo(db.fn.now());
    });
    console.log('✅ Users table created');
  }
}

async function createBooksTable() {
  const exists = await db.schema.hasTable('books');
  if (!exists) {
    await db.schema.createTable('books', (table) => {
      table.increments('id').primary();
      table.string('title');
      table.string('author');
      table.integer('year');
    });
    console.log('✅ Books table created');
  }
}

async function initTables() {
  await createUsersTable();
  await createBooksTable();
}

module.exports = initTables;
