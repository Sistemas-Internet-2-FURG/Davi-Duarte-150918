module.exports = (sequelize, DataTypes) => {
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
  
    Student.associate = (models) => {
      Student.belongsTo(models.Class, { foreignKey: 'classId', as: 'turma' });
    };
  
    return Student;
  };