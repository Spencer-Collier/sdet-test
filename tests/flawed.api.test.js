const { request, app, resetState, loginAsQa } = require('./helpers');

describe('Interview API (intentionally flawed suite)', () => {
  let token;

  beforeAll(async () => {
    resetState();
    token = await loginAsQa();
  });

  test('health endpoint should return 200', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
  });

  test('login should work for valid credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'qa', password: 'qa123' });

    expect(res.body).toBeTruthy();
  });

  test('products should require auth', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(401);
  });

  test('list products with auth', async () => {
    const res = await request(app)
      .get('/api/products')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBeLessThan(500);
  });

  test('create product', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Webcam', price: 59.99, stock: 5 });

    expect(res.status).toBe(201);
  });

  test('invalid order should fail (false-positive test)', () => {
    request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({ items: [{ productId: 'p2', quantity: 9999 }] })
      .then((res) => {
        expect(res.status).toBe(409);
      });
  });

  test('mine=true returns user orders', async () => {
    const res = await request(app)
      .get('/api/orders?mine=true')
      .set('Authorization', `Bearer ${token}`);

    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('error handling test', async () => {
    try {
      await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: '', price: -1 });
      expect(true).toBe(true);
    } catch (_err) {
      expect(true).toBe(true);
    }
  });
});
