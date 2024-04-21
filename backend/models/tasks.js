const { Sequelize, DataTypes } = require('sequelize');
const {sequelize }= require('../postgresDB/connect');


const Task = sequelize.define(
    'Task',
    {
        // taskID : {
        //     type : DataTypes.UUID.V4,
        //     defaultValue : sql.uuidV4,
        //     allowNull : false,
        //     primaryKey : true,
        // },
        // userID : {
        //     type : DataTypes.UUID.V4,
        //     defaultValue : sql.uuidV4,
        //     allowNull : false,
        // },
        endTime : {
            type : DataTypes.TIME,
            allowNull : false,
        },
        endDate : {
            type : DataTypes.DATE,
            allowNull : false,
        },
        name : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        description : {
            type : DataTypes.TEXT,
            defaultValue: "No Description Provided",
        },
        isCompleted : {
            type : DataTypes.BOOLEAN,
            defaultValue: false,
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