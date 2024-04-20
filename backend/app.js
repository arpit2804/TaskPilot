const express = require ('express');
const app = express();
require('dotenv').config();
const {connectDB} = require('./postgresDB/connect');

//db connection

//middlewares

//routes
app.get('/',(req,res)=>{
  res.send('hello users');
})
//app listen

const port = process.env.PORT || 3000;

const start =async ()=>{
  try {
    await connectDB(process.env.SEQUELIZE_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
    
  } catch (error) {
    console.log(error);
  }
}
start();