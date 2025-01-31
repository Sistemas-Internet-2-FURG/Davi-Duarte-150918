import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const AlunoModal = ({ isOpen, onRequestClose, onSubmit, alunoForm, setAlunoForm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="overlay"
    >
      <h3>Cadastrar Aluno</h3>
      <form onSubmit={onSubmit} className="form">
        <input type="text" value={alunoForm.matricula} onChange={(e) => setAlunoForm({ ...alunoForm, matricula: e.target.value })} placeholder="Matrícula do Aluno" required className="input" />
        <input type="text" value={alunoForm.nome} onChange={(e) => setAlunoForm({ ...alunoForm, nome: e.target.value })} placeholder="Nome do Aluno" required className="input" />
        <button type="submit" className="button">Cadastrar Aluno</button>
      </form>
    </Modal>
  );
};

export default AlunoModal;
