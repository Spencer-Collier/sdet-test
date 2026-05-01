# SDET API Challenge

## Note

The test suite is intentionally flawed for interview purposes and should not be treated as production-grade quality.

## Scenario

You are joining a team that owns an order-processing API. The current test suite is passing, but you suspect it does not provide meaningful quality coverage.

## Your Task

1. Evaluate the existing JavaScript test suite in `tests/flawed.api.test.js`.
2. Identify critical quality gaps, false positives, and weak assertions.
3. Improve the test suite to produce reliable and correct results.
4. Add any additional tests needed for meaningful API coverage.

## Constraints

- Keep implementation code stable unless you find a true defect.
- If you modify implementation code, document why.
- Use JavaScript only for tests.

## Deliverables

1. Updated test suite.
2. Explanation of what was done, and why

# Project explanation

This project contains:

- A fully functional REST API (`Express`) under /src folder
- An intentionally flawed JavaScript test suite (`Jest` + `Supertest`)

## Quick Start

```bash
npm install
npm test
npm start
```

Server default URL: `http://localhost:3000`

## API Overview

- `GET /health`
- `POST /auth/login`
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products`
- `GET /api/orders`
- `POST /api/orders`

Auth:

- Use `POST /auth/login` with `{ "username": "qa", "password": "qa123" }`
- Pass token as `Authorization: Bearer <token>`


