const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


const Class = sequelize.define('Class', {
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nomeDisciplina: { 
    type: DataTypes.STRING,
    allowNull: false,
  },
  turma: { 
    type: DataTypes.ENUM('A', 'B', 'C', 'U'),
    allowNull: false,
  },
  vagas: {  
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  diaSemana: { 
    type: DataTypes.STRING,
    allowNull: false,
  },
  horarioInicio: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  horarioFim: {
    type: DataTypes.TIME,
    allowNull: false,
  },
});

// Definir o modelo Student (Alunos)
const Student = sequelize.define('Student', {
  matricula: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Associar os modelos
Class.hasMany(Student, { foreignKey: 'classId', as: 'students' });
Student.belongsTo(Class, { foreignKey: 'classId', as: 'class' });

// Exportar todos os modelos e a instância do sequelize
module.exports = {
  User,
  Class,
  Student,
  sequelize,
};
