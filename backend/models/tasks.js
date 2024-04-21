const { Sequelize, DataTypes } = require('sequelize');
const {sequelize }= require('../postgresDB/connect');
const User = require('./user');

const Task = sequelize.define(
    'Task',
    {
        taskid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1, // Use Sequelize's UUIDV1 to generate UUIDs
        allowNull: false,
        primaryKey:true,
        },
        // userID : {
        //     type : DataTypes.UUID.V4,
        //     defaultValue : sql.uuidV4,
        //     allowNull : false,
        // },
        endDate : {
            type : DataTypes.DATE,
            allowNull : false,
            isDate: true,
        },
        name : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        description : {
            type : DataTypes.TEXT,
            defaultValue: "No Description Provided",
        },
        status: {
            type : DataTypes.ENUM,
            values: ['pending','active','completed','missed'],
            defaultValue: 'pending',
        },
    }
    
);


async function syncDatabase() {
    try {
      await sequelize.sync();
      console.log('Models synchronized with database');
    } catch (error) {
      console.error('Error syncing models with database:', error);
    }
  }
  
  syncDatabase();

module.exports = Task;