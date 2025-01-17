const jwt = require('jsonwebtoken');
require('dotenv').config(); // Carrega as variáveis do .env

// Configurações
const secretKey = process.env.JWT_SECRET || 'Senha_dos_guri'; // Chave secreta
const expiresIn = '1h'; // Validade do token

// Função para gerar o token
const generateToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn });
};

// Dados do usuário para criar o token
const userId = 1; // ID do usuário fictício
const userEmail = 'daviduarte996@gmail.com'; // Email fictício

// Payload do token
const payload = {
  userId,
  email: userEmail,
};

// Gera o token
const token = generateToken(payload);

console.log('Token gerado:', token);
