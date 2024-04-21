const express = require ('express');
const app = express();
require('dotenv').config();
const {sequelize} = require('./postgresDB/connect');
//routes import
const authRouter = require('./routes/auth');
const taskRouter  = require('./routes/task');
const classRouter = require('./routes/class');

//authentication middleware
const authenticateUser = require('./middleware/authMiddleware');

//middlewares
app.use(express.json());
//routes
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/tasks',authenticateUser,taskRouter);
app.use('/api/v1/classes',authenticateUser,classRouter);
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