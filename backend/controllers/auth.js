const User = require ('../models/user');
const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken');

const register = async (req,res)=>{
   const user = await User.create({...req.body});
   const {name,id} = user;
   const token = jwt.sign({name,id}, process.env.JWT_SECRET,{ expiresIn: "30d"});
   res.status(StatusCodes.CREATED).json({user:{name:user.name}, token});
}

const login = async (req,res)=>{
  res.send('hello');
}

module.exports = {register,login}