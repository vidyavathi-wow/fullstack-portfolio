const express = require('express');
const logger = require('./middlewares/logger');

const app = express();

const port = 4000;

app.use(logger);

app.get('/', (req, res) => {
  return res.json('Hello World');
});
app.get('/health', (req, res) => {
  return res.status(200).json('Health check done');
});

app.listen(port, () => {
  console.log(`Server started runnnig at http://localhost:${port}`);
});
