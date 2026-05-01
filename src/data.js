const crypto = require('crypto');

const state = {
  users: [
    { id: 'u1', username: 'admin', password: 'admin123', role: 'admin' },
    { id: 'u2', username: 'qa', password: 'qa123', role: 'qa' }
  ],
  sessions: new Map(),
  products: [
    { id: 'p1', name: 'Mechanical Keyboard', price: 99.99, inStock: true, stock: 10 },
    { id: 'p2', name: 'USB-C Dock', price: 149.5, inStock: true, stock: 6 },
    { id: 'p3', name: '4K Monitor', price: 329.0, inStock: false, stock: 0 }
  ],
  orders: []
};

function resetState() {
  state.sessions = new Map();
  state.orders = [];
  state.products = [
    { id: 'p1', name: 'Mechanical Keyboard', price: 99.99, inStock: true, stock: 10 },
    { id: 'p2', name: 'USB-C Dock', price: 149.5, inStock: true, stock: 6 },
    { id: 'p3', name: '4K Monitor', price: 329.0, inStock: false, stock: 0 }
  ];
}

function createToken() {
  return crypto.randomBytes(16).toString('hex');
}

module.exports = {
  state,
  resetState,
  createToken
};
