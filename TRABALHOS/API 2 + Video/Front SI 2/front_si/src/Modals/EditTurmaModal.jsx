import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const EditTurmaModal = ({ isOpen, onRequestClose, onSubmit, editTurmaForm, setEditTurmaForm }) => {
  if (!editTurmaForm) {
    return null; // Não renderiza nada se editTurmaForm for null
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="overlay"
    >
      <h3>Editar Turma</h3>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          value={editTurmaForm.codigo}
          onChange={(e) => setEditTurmaForm({ ...editTurmaForm, codigo: e.target.value })}
          placeholder="Código da Turma"
          required
          className="input"
        />
        <input
          type="text"
          value={editTurmaForm.nomeDisciplina}
          onChange={(e) => setEditTurmaForm({ ...editTurmaForm, nomeDisciplina: e.target.value })}
          placeholder="Nome da Disciplina"
          required
          className="input"
        />
        <select
          value={editTurmaForm.turma}
          onChange={(e) => setEditTurmaForm({ ...editTurmaForm, turma: e.target.value })}
          required
          className="input"
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="U">U</option>
        </select>
        <input
          type="number"
          value={editTurmaForm.vagas}
          onChange={(e) => setEditTurmaForm({ ...editTurmaForm, vagas: e.target.value })}
          placeholder="Número de Vagas"
          required
          className="input"
        />
        <input
          type="text"
          value={editTurmaForm.diaSemana}
          onChange={(e) => setEditTurmaForm({ ...editTurmaForm, diaSemana: e.target.value })}
          placeholder="Dia da Semana"
          required
          className="input"
        />
        <input
          type="time"
          value={editTurmaForm.horarioInicio}
          onChange={(e) => setEditTurmaForm({ ...editTurmaForm, horarioInicio: e.target.value })}
          placeholder="Horário de Início"
          required
          className="input"
        />
        <input
          type="time"
          value={editTurmaForm.horarioFim}
          onChange={(e) => setEditTurmaForm({ ...editTurmaForm, horarioFim: e.target.value })}
          placeholder="Horário de Fim"
          required
          className="input"
        />
        <button type="submit" className="button">Salvar Alterações</button>
      </form>
    </Modal>
  );
};

export default EditTurmaModal;
