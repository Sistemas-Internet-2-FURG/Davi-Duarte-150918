import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function AddProfessorModal({ isOpen, onRequestClose, onSubmit }) {
  const [professorForm, setProfessorForm] = useState({ nome: '', matricula: '', cpf: '' });

  const handleChange = (e) => {
    setProfessorForm({ ...professorForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(professorForm);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal" overlayClassName="overlay">
      <h2>Adicionar Professor</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input type="text" name="nome" value={professorForm.nome} onChange={handleChange} required />

        <label>Matrícula:</label>
        <input type="text" name="matricula" value={professorForm.matricula} onChange={handleChange} required />

        <label>CPF:</label>
        <input type="text" name="cpf" value={professorForm.cpf} onChange={handleChange} required />

        <div className="modal-buttons">
          <button type="submit">Adicionar</button>
          <button type="button" onClick={onRequestClose}>Cancelar</button>
        </div>
      </form>
    </Modal>
  );
}

export default AddProfessorModal;
