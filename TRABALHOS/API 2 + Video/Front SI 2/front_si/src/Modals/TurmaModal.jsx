import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const TurmaModal = ({ isOpen, onRequestClose, onSubmit, turmaForm, setTurmaForm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="overlay"
    >
      <h3>Cadastrar Turma</h3>
      <form onSubmit={onSubmit} className="form">
        <input type="text" value={turmaForm.codigo} onChange={(e) => setTurmaForm({ ...turmaForm, codigo: e.target.value })} placeholder="Código da Turma" required className="input" />
        <input type="text" value={turmaForm.nomeDisciplina} onChange={(e) => setTurmaForm({ ...turmaForm, nomeDisciplina: e.target.value })} placeholder="Nome da Disciplina" required className="input" />
        <select value={turmaForm.turma} onChange={(e) => setTurmaForm({ ...turmaForm, turma: e.target.value })} required className="input">
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="U">U</option>
        </select>
        <input type="number" value={turmaForm.vagas} onChange={(e) => setTurmaForm({ ...turmaForm, vagas: e.target.value })} placeholder="Número de Vagas" required className="input" />
        <input type="text" value={turmaForm.diaSemana} onChange={(e) => setTurmaForm({ ...turmaForm, diaSemana: e.target.value })} placeholder="Dia da Semana" required className="input" />
        <input type="time" value={turmaForm.horarioInicio} onChange={(e) => setTurmaForm({ ...turmaForm, horarioInicio: e.target.value })} placeholder="Horário de Início" required className="input" />
        <input type="time" value={turmaForm.horarioFim} onChange={(e) => setTurmaForm({ ...turmaForm, horarioFim: e.target.value })} placeholder="Horário de Fim" required className="input" />

        <button type="submit" className="button">Cadastrar Turma</button>
      </form>
    </Modal>
  );
};

export default TurmaModal;
