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
// Rota para atualizar um aluno
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { matricula, nome, classId } = req.body;

  try {
    const alunoExistente = await Student.findByPk(id);
    if (!alunoExistente) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }

    await alunoExistente.update({ matricula, nome, classId });
    res.status(200).json(alunoExistente);
  } catch (error) {
    console.error('Erro ao atualizar aluno:', error);
    res.status(500).json({ error: 'Erro ao atualizar aluno' });
  }
});
router.get('/:id/alunos', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const turma = await Class.findByPk(id, {
      include: [{ model: Student, as: 'alunos' }]
    });

    if (!turma) {
      return res.status(404).json({ error: 'Turma não encontrada' });
    }

    res.status(200).json(turma.alunos);
  } catch (error) {
    console.error('Erro ao buscar alunos da turma:', error);
    res.status(500).json({ error: 'Erro ao buscar alunos da turma' });
  }
});

// Rota para deletar um aluno
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar o aluno no banco de dados
    const aluno = await Student.findByPk(id);
    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }

    // Verificar se o aluno está vinculado a uma turma
    if (aluno.classId) {
      return res.status(400).json({ error: 'Aluno não pode ser excluído porque está vinculado a uma turma' });
    }

    // Se não estiver vinculado, excluir o aluno
    await aluno.destroy();
    res.status(200).json({ message: 'Aluno excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar aluno:', error);
    res.status(500).json({ error: 'Erro ao deletar aluno' });
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
