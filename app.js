const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const { goodsRouter } = require('./routes');
app.use('/goods', goodsRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Page not found' });
});

app.use((err, _, res, __) => {
  const { statusCode = 500, message = 'Internal server error' } = err;
  res.status(statusCode).json({ message });
});

module.exports = app;
