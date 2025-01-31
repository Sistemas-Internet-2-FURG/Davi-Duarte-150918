module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define(
    'Class',
    {
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
    },
    {
      tableName: 'Classes',
      timestamps: false, // Se precisar de createdAt e updatedAt, mude para true
    }
  );

  // Definir associação com Student
  Class.associate = (models) => {
    Class.hasMany(models.Student, {
      foreignKey: 'classId',
      as: 'alunos',
      onDelete: 'RESTRICT', // Impede a exclusão da turma se houver alunos
    });
  };

  return Class;
};
