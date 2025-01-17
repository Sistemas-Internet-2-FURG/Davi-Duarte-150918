const express = require('express');
const cors = require('cors'); // Declaração correta do cors
const { sequelize, User } = require('./models'); // Certifique-se de importar o modelo User
const bcrypt = require('bcryptjs'); // Para criptografar a senha
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const classRoutes = require('./routes/classRoutes'); // Importa as rotas de turmas
const studentRoutes = require('./routes/studentRoutes'); // Importa as rotas de alunos

const app = express(); // Inicializa a aplicação Express

app.use(cors()); // Configura o middleware cors
app.use(express.json()); // Adiciona o middleware para interpretar JSON no corpo da requisição

// Rotas de autenticação
app.use('/api/auth', authRoutes);

// Rotas de turmas
app.use('/api/turmas', classRoutes);

// Rotas de alunos
app.use('/api/alunos', studentRoutes);

// Função para criar um usuário padrão caso não existam usuários
const createDefaultUser = async () => {
  try {
    const userCount = await User.count(); // Conta os usuários no banco
    if (userCount === 0) {
      const hashedPassword = await bcrypt.hash('12345678', 10); // Criptografa a senha
      await User.create({
        email: 'daviduarte996@gmail.com',
        password: hashedPassword,
      });
      console.log('Usuário padrão criado com sucesso!');
    } else {
      console.log('Usuários já existentes no banco.');
    }
  } catch (error) {
    console.error('Erro ao verificar ou criar usuário padrão:', error);
  }
};

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  try {
    await sequelize.sync({ alter: true }); 
    console.log('Database connected and synced successfully');
    await createDefaultUser(); 
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
