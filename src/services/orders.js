const { state } = require('../data');

function createOrder(userId, items) {
  if (!Array.isArray(items) || items.length === 0) {
    const err = new Error('Order items are required');
    err.status = 400;
    throw err;
  }

  const normalizedItems = items.map((item) => {
    const product = state.products.find((p) => p.id === item.productId);
    if (!product) {
      const err = new Error(`Unknown product: ${item.productId}`);
      err.status = 400;
      throw err;
    }

    const quantity = Number(item.quantity);
    if (!Number.isFinite(quantity) || quantity <= 0) {
      const err = new Error('Quantity must be a positive number');
      err.status = 400;
      throw err;
    }

    if (product.stock < quantity) {
      const err = new Error(`Insufficient stock for ${product.id}`);
      err.status = 409;
      throw err;
    }

    return {
      productId: product.id,
      quantity,
      price: product.price,
      lineTotal: Number((product.price * quantity).toFixed(2))
    };
  });

  const total = Number(normalizedItems.reduce((sum, i) => sum + i.lineTotal, 0).toFixed(2));

  normalizedItems.forEach((item) => {
    const product = state.products.find((p) => p.id === item.productId);
    product.stock -= item.quantity;
    product.inStock = product.stock > 0;
  });

  const order = {
    id: `o${state.orders.length + 1}`,
    userId,
    createdAt: new Date().toISOString(),
    items: normalizedItems,
    total
  };

  state.orders.push(order);
  return order;
}

module.exports = { createOrder };
