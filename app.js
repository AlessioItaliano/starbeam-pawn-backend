const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');

const app = express();

const { itemsRouter, authRouter, clientsRouter } = require('./routes');

app.use(cors());
app.use(express.json());

app.use('/items', itemsRouter);
app.use('/auth', authRouter);
app.use('/clients', clientsRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use((_, res) => {
  res.status(404).json({ message: 'Page not found' });
});

app.use((err, _, res, __) => {
  const { statusCode = 500, message = 'Internal server error' } = err;
  res.status(statusCode).json({ message });
});

module.exports = app;
