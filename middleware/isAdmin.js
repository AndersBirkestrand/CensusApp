const { Admin } = require('../models');

async function isAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const base64Credentials = authHeader.split(' ')[1];
  let login, password;

  try {
    const decoded = Buffer.from(base64Credentials, 'base64').toString();
    [login, password] = decoded.split(':');
  } catch {
    return res.status(400).json({ error: 'Invalid Authorization header format' });
  }

  if (!login || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  try {
    const admin = await Admin.findByPk(login);
    if (!admin || admin.password !== password) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = isAdmin;