module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Matériel', {
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
      quantite_necessaire: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: { 
            args : [0],
            msg : 'la quantité doit être sup ou égales à 0.'
          },
          max : {
            args : [999],
            msg : 'la quantité doit être inf ou égales à 999.'
          },
          isInt : {msg: 'Utilisez uniquement des nombres entiers.'},
          notNull:{msg: 'La quantité est une propriété requise'}
        }
      },
      quantite_en_stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args : [0],
            msg : 'la quantité doit être sup ou égales à 0.'
          },
          max : {
            args : [999],
            msg : 'la quantité doit être inferieur à 999.'
          },
          isInt : {msg: 'Utilisez uniquement des nombres entiers.'},
          notNull:{msg: 'La quantité sont une propriété requise'}
        }
      },
      quantite_sur_place: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args : [0],
            msg : 'la quantité doit être sup ou égales à 0.'
          },
          max : {
            args : [999],
            msg : 'la quantité doit être inferieur à 999.'
          },
          isInt : {msg: 'Utilisez uniquement des nombres entiers.'},
          notNull:{msg: 'La quantité est une propriété requise'}
        }
      },
      contact_location: {
        type: DataTypes.STRING,
      }
    })
  }