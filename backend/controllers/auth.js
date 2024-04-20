const User = require ('../models/user');

const register = async (req,res)=>{
   const user = await User.create({...req.body});
   res.status(200).json({user});
}

const login = async (req,res)=>{
  res.send('hello');
}

module.exports = {register,login}