const express = require('express');
const { Student } = require('../models');
const authenticateToken = require('../middlewares/authMiddleware'); // Middleware para verificar token

const router = express.Router();

// Rota para listar todos os alunos
router.get('/', authenticateToken, async (req, res) => {
  try {
    const alunos = await Student.findAll();
    res.status(200).json(alunos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar alunos' });
  }
});

// Rota para criar um novo aluno
router.post('/', authenticateToken, async (req, res) => {
  const { matricula, nome, classId } = req.body;
  try {
    const novoAluno = await Student.create({ matricula, nome, classId });
    res.status(201).json(novoAluno);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar aluno' });
  }
});

module.exports = router;
