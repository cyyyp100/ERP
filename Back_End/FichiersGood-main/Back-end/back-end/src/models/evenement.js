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
            type: DataTypes.TEXT,
            allowNull: true,
            get() {
                const rawValue = this.getDataValue('questionsInterieur');
                return rawValue ? JSON.parse(rawValue) : null;
            },
            set(value) {
                this.setDataValue('questionsInterieur', JSON.stringify(value));
            }
        },
        questionsExterieur: {
            type: DataTypes.TEXT,
            allowNull: true,
            get() {
                const rawValue = this.getDataValue('questionsExterieur');
                return rawValue ? JSON.parse(rawValue) : null;
            },
            set(value) {
                this.setDataValue('questionsExterieur', JSON.stringify(value));
            }
        },
        questionsMixte: {
            type: DataTypes.TEXT,
            allowNull: true,
            get() {
                const rawValue = this.getDataValue('questionsMixte');
                return rawValue ? JSON.parse(rawValue) : null;
            },
            set(value) {
                this.setDataValue('questionsMixte', JSON.stringify(value));
            }
        },
        parking: {
            type: DataTypes.TEXT,
            allowNull: true,
            get() {
                const rawValue = this.getDataValue('parking');
                return rawValue ? JSON.parse(rawValue) : null;
            },
            set(value) {
                this.setDataValue('parking', JSON.stringify(value));
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
        vigneronsNoms: {
            type: DataTypes.TEXT,
            allowNull: true,
            get() {
                const rawValue = this.getDataValue('vigneronsNoms');
                return rawValue ? JSON.parse(rawValue) : [];
            },
            set(value) {
                this.setDataValue('vigneronsNoms', JSON.stringify(value));
            }
        },
        prestatairesNoms: {
            type: DataTypes.TEXT,
            allowNull: true,
            get() {
                const rawValue = this.getDataValue('prestatairesNoms');
                return rawValue ? JSON.parse(rawValue) : [];
            },
            set(value) {
                this.setDataValue('prestatairesNoms', JSON.stringify(value));
            }
        },
        animationsNoms: {
            type: DataTypes.TEXT,
            allowNull: true,
            get() {
                const rawValue = this.getDataValue('animationsNoms');
                return rawValue ? JSON.parse(rawValue) : [];
            },
            set(value) {
                this.setDataValue('animationsNoms', JSON.stringify(value));
            }
        },
        sponsorsNoms: {
            type: DataTypes.TEXT,
            allowNull: true,
            get() {
                const rawValue = this.getDataValue('sponsorsNoms');
                return rawValue ? JSON.parse(rawValue) : [];
            },
            set(value) {
                this.setDataValue('sponsorsNoms', JSON.stringify(value));
            }
        },
        activites: {
            type: DataTypes.JSON,
            allowNull: true
        },
        activitesDetails: {
            type: DataTypes.JSON,
            allowNull: true
        },
    }
    });
  };
  