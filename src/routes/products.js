const express = require('express');
const { state } = require('../data');

const router = express.Router();

router.get('/', (req, res) => {
  const minPrice = req.query.minPrice ? Number(req.query.minPrice) : null;
  const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : null;
  const inStock = req.query.inStock;

  let results = [...state.products];

  if (minPrice !== null && Number.isFinite(minPrice)) {
    results = results.filter((p) => p.price >= minPrice);
  }

  if (maxPrice !== null && Number.isFinite(maxPrice)) {
    results = results.filter((p) => p.price <= maxPrice);
  }

  if (typeof inStock === 'string') {
    const flag = inStock.toLowerCase() === 'true';
    results = results.filter((p) => p.inStock === flag);
  }

  return res.status(200).json({ count: results.length, data: results });
});

router.get('/:id', (req, res) => {
  const product = state.products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  return res.status(200).json(product);
});

router.post('/', (req, res) => {
  const { name, price, stock = 0 } = req.body || {};

  if (!name || !Number.isFinite(Number(price)) || Number(price) <= 0) {
    return res.status(400).json({ error: 'name and positive price are required' });
  }

  const newProduct = {
    id: `p${state.products.length + 1}`,
    name: String(name),
    price: Number(price),
    stock: Number(stock) || 0,
    inStock: (Number(stock) || 0) > 0
  };

  state.products.push(newProduct);
  return res.status(201).json(newProduct);
});

module.exports = router;
