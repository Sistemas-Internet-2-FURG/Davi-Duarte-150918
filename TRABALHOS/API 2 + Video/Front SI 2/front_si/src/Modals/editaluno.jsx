import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

function EditAlunoModal({ isOpen, onRequestClose, onSubmit, editAlunoForm, setEditAlunoForm }) {
  const [turmas, setTurmas] = useState([]);

  // Buscar turmas ao abrir o modal
  useEffect(() => {
    const fetchTurmas = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/api/turmas', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTurmas(response.data);
      } catch (error) {
        console.error('Erro ao buscar turmas:', error);
      }
    };

    if (isOpen) {
      fetchTurmas();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setEditAlunoForm({ ...editAlunoForm, [e.target.name]: e.target.value });
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal" overlayClassName="overlay">
      <h2>Editar Aluno</h2>
      <form onSubmit={onSubmit}>
        <label>Matrícula:</label>
        <input type="text" name="matricula" value={editAlunoForm?.matricula || ''} onChange={handleChange} required />

        <label>Nome:</label>
        <input type="text" name="nome" value={editAlunoForm?.nome || ''} onChange={handleChange} required />

        <label>Turma:</label>
        <select name="classId" value={editAlunoForm?.classId || ''} onChange={handleChange} required>
          <option value="">Selecione uma turma</option>
          {turmas.map((turma) => (
            <option key={turma.id} value={turma.id}>
              {turma.codigo} - {turma.nomeDisciplina} ({turma.turma})
            </option>
          ))}
        </select>

        <div className="modal-buttons">
          <button type="submit">Salvar</button>
          <button type="button" onClick={onRequestClose}>Cancelar</button>
        </div>
      </form>
    </Modal>
  );
}

export default EditAlunoModal;
