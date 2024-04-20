const express = require ('express');
const app = express();
require('dotenv').config();
const {sequelize} = require('./postgresDB/connect');
const taskRouter  = require('./routes/task');

//db connection

//middlewares
app.use('/tasks',taskRouter);

//routes
app.get('/',(req,res)=>{
  res.send('hello users');
})
//app listen

const port = process.env.PORT || 3000;

const start =async ()=>{
  try {
    await sequelize.authenticate();
    console.log('connection has been established successfully. ')
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
    
  } catch (error) {
    console.log(error);
  }
}
start();