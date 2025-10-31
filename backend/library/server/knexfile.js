require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    },
    migrations: {
      directory: './migrations/',
    },
    seeds: {
      directory: './seeds/',
    },
  },

  test: {
    client: 'pg',
    connection: {
      host: process.env.TEST_DB_HOST || process.env.DB_HOST,
      user: process.env.TEST_DB_USER || process.env.DB_USER,
      password: process.env.TEST_DB_PASSWORD || process.env.DB_PASSWORD,
      database: process.env.TEST_DB_NAME || `${process.env.DB_NAME}_test`,
      port: process.env.TEST_DB_PORT || process.env.DB_PORT,
    },
    migrations: {
      directory: './migrations/',
    },
    seeds: {
      directory: './seeds/',
    },
  },
};
