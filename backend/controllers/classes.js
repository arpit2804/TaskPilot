const Class = require('../models/class');
const {StatusCodes} = require('http-status-codes');
const {Op} = require('sequelize');
const {BadRequestError,NotFoundError} = require('../errors');

const checkForOverlap = async(date,newStartTime, newEndTime)=>{
    const existingClasses = await Class.findAll({
    where: {
      [Op.and] : [ {Date:date} , 
      {      [Op.or]: [
        {
          startTime: { [Op.between]: [newStartTime, newEndTime] },
        },
        {
          endTime: { [Op.between]: [newStartTime, newEndTime] },
        },
        {
          startTime: { [Op.lt]: newStartTime },
          endTime: { [Op.gt]: newEndTime },
        },
      ]}],
    },
  });
  //console.log(existingClasses);
  return existingClasses.length > 0;
}

const getClass = async(req,res) => {
    const {userId} = req.user;

    const classes = await Class.findAll({
      where: {
        UserId : userId,
      },
      order :[
        ['Date','ASC'],
        ['startTime','ASC'],
      ],
    });

    res.status(StatusCodes.OK).json({classes, count:classes.length});
}

const getOneClass = async(req,res) =>{
    const {
    user: { userId },
    params: { id: classId },
    } = req
    const oldclass = await Class.findOne({
      where:{
        [Op.and] : [{UserId:userId} , {classId}],
      }
    });

    if(!oldclass) throw new NotFoundError(`No Class exists with this id :${classId}`);

    res.status(StatusCodes.OK).json({oldclass});
}

const createClass = async(req,res) =>{
    const {userId} = req.user;
    const{Date,startTime,endTime} = req.body;
    const overlapExists  = await checkForOverlap(Date,startTime,endTime);
    //console.log(overlapExists);
    if(!overlapExists){
     const newclass = await Class.create({...req.body,UserId:userId});
     return res.status(StatusCodes.CREATED).json({newclass});
    }
    
    res.status(409).json({error:'class can not be scheduled for this time'});
}

const editClass = async(req,res) => {
    const{
      user:{userId},
      body:{status},
      params : {id:classId},
    }=req;

    if(!status) throw new BadRequestError('please enter the status to be changed');

    const [rowsAffected] = await Class.update(
      {status},
      {
        where: {
        UserId : userId,
        classId : classId,
      },
     },
    );

    
    if(rowsAffected === 0 ) throw new NotFoundError(`No rows were affected`);

    res.status(StatusCodes.OK).json({rowsAffected});

}

const deleteClass = async(req,res) =>{
    const {
      user: {userId},
      params:{id:classId},
    } = req;

    const oldclass = await Class.destroy({
        where:{
            [Op.and] :[{UserId:userId},{classId}],
        },
    });

    if (!oldclass) {
    throw new NotFoundError(`No class with id ${classId}`);
  }
   res.status(StatusCodes.OK).send('record deleted');
}

module.exports = {
getClass,
getOneClass,
createClass,
editClass,
deleteClass
}