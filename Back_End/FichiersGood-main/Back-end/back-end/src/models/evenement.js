module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Evenement', {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateDebut: {
          type: DataTypes.DATE,
          allowNull: false
      },
      heureDebut: {
          type: DataTypes.TIME,
          allowNull: false
      },
      dateFin: {
          type: DataTypes.DATE,
          allowNull: false
      },
      heureFin: {
          type: DataTypes.TIME,
          allowNull: false
      },
      lieu: {
          type: DataTypes.STRING,
          allowNull: false
      },
      typeLieu: {
          type: DataTypes.STRING,
          allowNull: false
      },
      objectifs: {
          type: DataTypes.STRING,
          get() {
              const rawValue = this.getDataValue('objectifs');
              return rawValue ? rawValue.split(', ') : [];
          },
          set(value) {
              this.setDataValue('objectifs', Array.isArray(value) ? value.join(', ') : '');
          }
      },
      questionsInterieur: {
          type: DataTypes.STRING,
          allowNull: true
      },
      questionsExterieur: {
          type: DataTypes.STRING,
          allowNull: true
      },
      questionsMixte: {
          type: DataTypes.STRING,
          allowNull: true
      },
      vignerons: {
          type: DataTypes.STRING,
          allowNull: true
      },
      prestataires: {
          type: DataTypes.STRING,
          allowNull: true
      }
  });
};
