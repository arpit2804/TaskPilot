const {Sequelize, Model,DataTypes} = require('sequelize');
const {sequelize} = require('../postgresDB/connect');

const User = sequelize.define(
  'User', {
    userID: {
      type: DataTypes.UUID.V4,
      defaultValue: sql.uuidV4,
      primaryKey: true
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isPhoneNumber(value) {
          if (!/^\+(?:[0-9] ?){6,14}[0-9]$/.test(value)) {
            throw new Error('Invalid phone number');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, 
        customValidator(value) {
          if (!/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(value)) {
            throw new Error('Invalid email address');
          }
        }
      }
    },
    password:{
    type: DataTypes.STRING,
    allowNull: false,  
    }
  }
)

async function syncDatabase() {
    try {
      await sequelize.sync();
      console.log('Models synchronized with database');
    } catch (error) {
      console.error('Error syncing models with database:', error);
    }
  }
  
 syncDatabase();

 module.exports = User;