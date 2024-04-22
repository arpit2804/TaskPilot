const { Sequelize, DataTypes } = require('sequelize');
const {sequelize }= require('../postgresDB/connect');

const Class = sequelize.define(
  'Class',
  {
      classId: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1, 
        allowNull: false,
        primaryKey:true,
      },
      name : {
          type : DataTypes.STRING,
          allowNull : false,
      },
      Date : {
            type : DataTypes.DATEONLY,
            defaultValue : DataTypes.NOW,
            allowNull : false,
      },
      startTime:{
            type : DataTypes.TIME,
            allowNull : false,
      },
      endTime:{
            type : DataTypes.TIME,
            allowNull : false,
      },
      status: {
            type : DataTypes.ENUM,
            values: ['pending','active','completed','missed'],
            defaultValue: 'pending',
      },
  }
);

  Class.beforeUpdate((instance, options) => {
    return instance.validate(); 
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

module.exports = Class;