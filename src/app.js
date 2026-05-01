const express = require('express');
const morgan = require('morgan');
const auth = require('./middleware/auth');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'sdet5-interview-api' });
});

app.use('/auth', authRoutes);
app.use('/api/products', auth, productRoutes);
app.use('/api/orders', auth, orderRoutes);

app.use((err, _req, res, _next) => {
  res.status(500).json({ error: err.message || 'Unhandled error' });
});

module.exports = app;
