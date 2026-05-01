const express = require('express');
const { state } = require('../data');
const { createOrder } = require('../services/orders');

const router = express.Router();

router.get('/', (req, res) => {
  const mineOnly = req.query.mine === 'true';
  const data = mineOnly ? state.orders.filter((o) => o.userId === req.user.id) : state.orders;
  return res.status(200).json({ count: data.length, data });
});

router.post('/', (req, res) => {
  try {
    const order = createOrder(req.user.id, req.body.items);
    return res.status(201).json(order);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message || 'Unexpected error' });
  }
});

module.exports = router;
