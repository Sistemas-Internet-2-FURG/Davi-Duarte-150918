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
      type: DataTypes.ENUM('A', 'B', 'C', 'U'), // Valores permitidos
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
  }, {
    tableName: 'Classes', // Garante que o Sequelize usa exatamente este nome
    timestamps: false // Adicione timestamps se necessário
  });
  