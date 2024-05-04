

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Sponsor', {
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
          notEmpty: {msg: 'le nom ne peut pas être vide.'},
          notNull: {msg: 'Le nom est une propriété requise'}
        }
      },
      prix: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: { 
            args : [0],
            msg : 'le prix doit être sup ou égales à 0.'
          },
          notNull:{msg: 'Les points de vie sont une propriété requise'}
        }
      },
      cout: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: {
            args : [0],
            msg : 'le coût doit être sup ou égales à 0.'
          },
          notNull:{msg: 'Le coût une propriété requise'}
        }
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull:{msg: 'Le contact est une propriété requise'}
        }
      }
    })
  }