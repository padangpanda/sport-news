'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: "Invalid email format"
        },
        notEmpty: {
          msg: "Email should not empty"
        },
        notNull: {
          msg: "Email should not null"
        }
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6],
          msg: "password at least 6 characters"
        },
        notEmpty: {
          msg : "Password should not empty"
        },
        notNull: {
          msg: "Password should not null"
        }
      }
    }, 
    sequelize,
    modelName: 'User',
  });
  return User;
};