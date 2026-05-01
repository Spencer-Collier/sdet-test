const { state } = require('../data');

function auth(req, res, next) {
  const header = req.get('authorization') || '';
  const token = header.replace(/^Bearer\s+/i, '').trim();

  if (!token || !state.sessions.has(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  req.user = state.sessions.get(token);
  return next();
}

module.exports = auth;
