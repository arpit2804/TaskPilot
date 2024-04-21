const User = require ('../models/user');
const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {Op} = require('sequelize');

const {BadRequestError,UnauthenticatedError} = require('../errors');

const register = async (req,res)=>{
   const user = await User.create({...req.body});
   const {name,id} = user;
   const token = jwt.sign({name,id}, process.env.JWT_SECRET,{ expiresIn: "30d"});
   res.status(StatusCodes.CREATED).json({user:{name:user.name}, token});
}

const login = async (req,res)=>{
  const {email,password} = req.body;
  if(!email || !password){
    throw new BadRequestError('Please provide email and password');
  }
  
  const user =await User.findOne({
    where: {
      email : {
        [Op.eq]: email,
      },
    },
  });

  if(!user){
    throw new UnauthenticatedError('Invalid Credentials');
  }

  console.log(user);
  console.log(user.password);
  console.log(typeof(password));
  // console.log(typeof(user.datavalues.password));
  const isPasswordCorrect = await bcrypt.compare(password,user.password);

   if(!isPasswordCorrect){
    throw new UnauthenticatedError('Invalid Credentials');
   }

  const token = jwt.sign({name:user.name,id:user.id}, process.env.JWT_SECRET,{ expiresIn: "30d"});
  res.status(StatusCodes.OK).json({user:{name:user.name},token});

}

module.exports = {register,login}