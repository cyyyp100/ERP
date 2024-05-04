const validTypes = ["Festif","Lucratif","Non Lucratif","Inauguration","Anniversaire","Mariage","Action Caritative", "Fête Commerciale","Remercier","Lancement de Produit"]



module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Evenement', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique : {
          msg: 'Le nom est déjà pris'
        },
        validate: {
          notEmpty: {msg: 'l e nom ne peut pas être vide.'},
          notNull: {msg: 'Le nom est une propriété requise'}
        }
      },
      nombre_de_personnes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args : [0],
            msg : 'le nombre de personnes doit être sup ou égales à 0.'
          },
          isInt : {msg: 'Utilisez uniquement des nombres entiers.'},
          notNull:{msg: 'Le nombre est une propriété requise'}
        }
      },
      lieu: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {msg: 'le lieu ne peut pas être vide.'},
          notNull: {msg: 'Le lieu est une propriété requise'}
        }
      },
      Objectif_de_l_evenement: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
          return this.getDataValue('Objectif_de_l_evenement').split(',')
        },
        set(types){
          this.setDataValue('Objectif_de_l_evenement', types.join())
        },
        validate : {
          isTypesValid(value) {
            if (!value) {
              throw new Error ('l\'évenement doit au moins avoir un objectif')
            }
            value.split(',').forEach(type => {
              if (!validTypes.includes(type)) {
                throw new Error (`L\'objectif d\'un evenement doit appartenir à la liste suivante : ${validTypes}`)
              }
            })
          }
        }
      }
    },{
        timestamps: true,
        createdAt: 'created',
        updatesAt: false
    })
  }