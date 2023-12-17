const jwt = require('jsonwebtoken');
const config = require('../config/config');

const blacklistedTokens = new Set();

/**Function named that authenticates the request user`s */
function authenticate(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Token de autorización no proporcionado' });
  }
if (blacklistedTokens.has(token)) {
  return res.status(401).json({ message: 'Esta sesion ha expirado o se ha cerrado' });
}


  try {
    
    const decoded = jwt.verify(token, config.secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token de autorización inválido' });
  }
}

module.exports = {
  authenticate,
  blacklistedTokens
};
