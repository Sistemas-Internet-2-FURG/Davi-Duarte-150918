import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faEdit } from '@fortawesome/free-solid-svg-icons';
import TurmaModal from '../Modals/TurmaModal';
import AlunoModal from '../Modals/AlunoModal';
import EditTurmaModal from '../Modals/EditTurmaModal';
import '../CSS/Dashboard.css';

function Dashboard() {
  const [turmas, setTurmas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [turmaForm, setTurmaForm] = useState({
    codigo: '',
    nomeDisciplina: '',
    turma: 'A',
    vagas: '',
    diaSemana: '',
    horarioInicio: '',
    horarioFim: ''
  });
  const [alunoForm, setAlunoForm] = useState({ matricula: '', nome: '' });
  const [editTurmaForm, setEditTurmaForm] = useState(null);
  const [isTurmaModalOpen, setIsTurmaModalOpen] = useState(false);
  const [isAlunoModalOpen, setIsAlunoModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      try {
        const turmaResponse = await axios.get('http://localhost:3001/api/turmas', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTurmas(turmaResponse.data);

        const alunoResponse = await axios.get('http://localhost:3001/api/alunos', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAlunos(alunoResponse.data);
      } catch (error) {
        console.error('Failed to fetch data', error);
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          handleLogout();
        }
      }
    };
    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleTurmaSubmit = async (e) => {
    const token = localStorage.getItem('token'); // Pega o token do usuário logado
    if (token) {
      try {
        // Faz a requisição para criar a turma com o backend
        const response = await axios.post('http://localhost:3001/api/turmas', turmaForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
  
        // Atualiza o estado com a nova turma criada
        setTurmas([...turmas, response.data]);
  
        // Limpa o formulário
        setTurmaForm({
          codigo: '',
          nomeDisciplina: '',
          turma: 'A',
          vagas: '',
          diaSemana: '',
          horarioInicio: '',
          horarioFim: ''
        });
  
        // Fecha o modal
        setIsTurmaModalOpen(false);
      } catch (error) {
        console.error('Failed to create turma', error);
        alert('Erro ao criar turma. Por favor, tente novamente.');
      }
    } else {
      handleLogout();
    }
  };

  const handleAlunoSubmit = async (e) => {
    e.preventDefault();
    console.log('Tentando cadastrar aluno...'); // Debug para ver se a função está sendo chamada

    const token = localStorage.getItem('token'); // Pega o token do usuário logado
    if (token) {
      try {
        console.log('Enviando requisição para criar aluno...'); // Debug antes da requisição
        const response = await axios.post('http://localhost:3001/api/alunos', alunoForm, {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log('Aluno criado com sucesso:', response.data); // Debug da resposta
        setAlunos([...alunos, response.data]); // Atualiza o estado com o novo aluno criado
        setAlunoForm({ matricula: '', nome: '' }); // Reseta o formulário
        setIsAlunoModalOpen(false); // Fecha o modal
      } catch (error) {
        console.error('Erro ao criar aluno:', error);
        alert('Erro ao criar aluno. Por favor, tente novamente.');
      }
    } else {
      handleLogout();
    }
  };

  const handleEditTurma = (turma) => {
    setEditTurmaForm(turma);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.put(`http://localhost:3001/api/turmas/${editTurmaForm.id}`, editTurmaForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTurmas(turmas.map(turma => turma.id === response.data.id ? response.data : turma));
        setIsEditModalOpen(false);
      } catch (error) {
        console.error('Failed to update turma', error);
      }
    } else {
      handleLogout();
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2 className="dashboard-title">Dashboard</h2>
        <div className="settings-container">
          <FontAwesomeIcon
            icon={faCog}
            className="settings-icon"
            onClick={() => setShowDropdown(!showDropdown)}
          />
          {showDropdown && (
            <div className="dropdown-menu">
              <ul>
                <li onClick={() => alert('Configurações clicado!')}>Configurações</li>
                <li onClick={handleLogout}>Sair</li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Botões para abrir os Modais de Cadastrar Turma e Aluno */}
      <div className="buttons-container">
        <button onClick={() => setIsTurmaModalOpen(true)} className="button">Cadastrar Nova Turma</button>
        <button onClick={() => setIsAlunoModalOpen(true)} className="button">Cadastrar Novo Aluno</button>
      </div>

      {/* Listagem de Turmas */}
      <div className="list-section">
        <h3>Turmas Cadastradas</h3>
        <ul className="posts-list">
          {turmas.map(turma => (
            <li key={turma.id} className="post-item">
              Código: {turma.codigo}, Disciplina: {turma.nomeDisciplina}, Turma: {turma.turma}, Vagas: {turma.vagas}, Dia: {turma.diaSemana}, Início: {turma.horarioInicio}, Fim: {turma.horarioFim}
              <button onClick={() => handleEditTurma(turma)} className="edit-button">
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Listagem de Alunos */}
      <div className="list-section">
        <h3>Alunos Cadastrados</h3>
        <ul className="posts-list">
          {alunos.map(aluno => (
            <li key={aluno.id} className="post-item">
              Matrícula: {aluno.matricula}, Nome: {aluno.nome}
            </li>
          ))}
        </ul>
      </div>

      {/* Modal para Cadastrar Turma */}
      <TurmaModal
        isOpen={isTurmaModalOpen}
        onRequestClose={() => setIsTurmaModalOpen(false)}
        onSubmit={handleTurmaSubmit}
        turmaForm={turmaForm}
        setTurmaForm={setTurmaForm}
      />

      {/* Modal para Cadastrar Aluno */}
      <AlunoModal
        isOpen={isAlunoModalOpen}
        onRequestClose={() => setIsAlunoModalOpen(false)}
        onSubmit={handleAlunoSubmit}
        alunoForm={alunoForm}
        setAlunoForm={setAlunoForm}
      />

      {/* Modal para Editar Turma */}
      <EditTurmaModal
        isOpen={isEditModalOpen && editTurmaForm !== null}
        onRequestClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        editTurmaForm={editTurmaForm}
        setEditTurmaForm={setEditTurmaForm}
      />
    </div>
  );
}

export default Dashboard;
