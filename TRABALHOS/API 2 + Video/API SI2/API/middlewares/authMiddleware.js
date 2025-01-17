const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Pega o token do header

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado. Nenhum token fornecido.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido.' });
    }
    req.user = user; // Adiciona o usuário ao request para uso futuro
    next(); // Continua para a próxima função
  });
};

module.exports = authenticateToken;
