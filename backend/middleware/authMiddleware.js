const User = require('../models/user');
const jwt = require('jsonwebtoken');
const {UnauthenticatedError} = require('../errors')

const auth = async (req,res,next)=>{

  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith('Bearer ')){
    throw new UnauthenticatedError('Authentication Failed');
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = {userId:payload.id,userName:payload.name};
    console.log(req.user);
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication Failed');
  }
  
}

module.exports = auth;