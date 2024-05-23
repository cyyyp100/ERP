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
        questionsInfrastructures: {
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
        },
        materielNecessaire: {
            type: DataTypes.JSON,
            allowNull: true
        },
        materielEnStock: {
            type: DataTypes.JSON,
            allowNull: true
        },
        materielSurSite: {
            type: DataTypes.JSON,
            allowNull: true
        },
        besoinSignalétique: {
            type: DataTypes.STRING,
            allowNull: true
        },
        superficie: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        nombresEntreesSimples: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        nombreEntreesPrincipales: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        forme: {
            type: DataTypes.STRING,
            allowNull: true
        },
        chauffage: {
            type: DataTypes.STRING,
            allowNull: true
        },
        coinFumeur: {
            type: DataTypes.STRING,
            allowNull: true
        },
        coinTraiteur: {
            type: DataTypes.STRING,
            allowNull: true
        },
        batimentERP: {
            type: DataTypes.STRING,
            allowNull: true
        },
        electricite: {
            type: DataTypes.STRING,
            allowNull: true
        },
        eau: {
            type: DataTypes.STRING,
            allowNull: true
        },
        poubelle: {
            type: DataTypes.STRING,
            allowNull: true
        },
        toilette: {
            type: DataTypes.STRING,
            allowNull: true
        },
        abris: {
            type: DataTypes.STRING,
            allowNull: true
        },
        vegetation: {
            type: DataTypes.STRING,
            allowNull: true
        },
        parking: {
            type: DataTypes.STRING,
            allowNull: true
        },
        distanceParking: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        proximiteDirecte: {
            type: DataTypes.STRING,
            allowNull: true
        },
        navette: {
            type: DataTypes.STRING,
            allowNull: true
        },
        typeDeSol: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
  };
  