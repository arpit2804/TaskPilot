const { Sequelize } = require('sequelize');

const connectDB =async (url)=>{
  const sequelize = new Sequelize(url);
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}


module.exports = {connectDB}