const {Sequelize, Model,DataTypes} = require('sequelize');
const {sequelize} = require('../postgresDB/connect');
const bcrypt = require('bcryptjs');


const User = sequelize.define(
  'User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV1, // Use Sequelize's UUIDV1 to generate UUIDs
      allowNull: false,
      primaryKey:true,
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
    isTenDigitPhoneNumber(value) {
      // Remove any non-digit characters from the input
        const phoneNumberDigits = value.replace(/\D/g, '');
      // Check if the resulting string has exactly 10 digits
        if (phoneNumberDigits.length !== 10) {
        throw new Error('Phone number must be exactly 10 digits long');
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

User.beforeCreate(async (user,options) =>{
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password,salt);
});

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