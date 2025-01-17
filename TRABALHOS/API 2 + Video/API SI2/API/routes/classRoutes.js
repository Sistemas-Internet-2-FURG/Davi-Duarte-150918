const express = require('express');
const { Class } = require('../models');
const authenticateToken = require('../middlewares/authMiddleware'); // Middleware de autenticação

const router = express.Router();

// Rota para listar todas as turmas
router.get('/', authenticateToken, async (req, res) => {
  try {
    const turmas = await Class.findAll();
    res.status(200).json(turmas);
  } catch (error) {
    console.error('Erro ao buscar turmas:', error);
    res.status(500).json({ error: 'Erro ao buscar turmas' });
  }
});

// Rota para criar uma nova turma
router.post('/', authenticateToken, async (req, res) => {
    const { codigo, nomeDisciplina, turma, vagas, diaSemana, horarioInicio, horarioFim } = req.body;
  
    console.log("Dados recebidos para criar turma:", req.body);
  
    try {
      const novaTurma = await Class.create({
        codigo,
        nomeDisciplina,
        turma,
        vagas,
        diaSemana,
        horarioInicio,
        horarioFim
      });
      res.status(201).json(novaTurma);
    } catch (error) {
      console.error('Erro ao criar turma:', error);
      res.status(500).json({ error: 'Erro ao criar turma' });
    }
  });

// Rota para atualizar uma turma existente
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { codigo, nomeDisciplina, turma, vagas, diaSemana, horarioInicio, horarioFim } = req.body;

  try {
    const turmaExistente = await Class.findByPk(id);
    if (!turmaExistente) {
      return res.status(404).json({ error: 'Turma não encontrada' });
    }

    await turmaExistente.update({ codigo, nomeDisciplina, turma, vagas, diaSemana, horarioInicio, horarioFim });
    res.status(200).json(turmaExistente);
  } catch (error) {
    console.error('Erro ao atualizar turma:', error);
    res.status(500).json({ error: 'Erro ao atualizar turma', detalhes: error.message });
  }
});

module.exports = router;
