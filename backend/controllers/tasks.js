const Task = require('../models/tasks');
const {StatusCodes} = require('http-status-codes');
const {Op} = require('sequelize');
const {BadRequestError,NotFoundError} = require('../errors');

const getTasks = async(req,res) => {
    const {userId} = req.user;
    const tasks = await Task.findAll({
        where: {
            UserId : userId
        },
        order: [
            ['endDate','ASC']
        ]
    });

    res.status(StatusCodes.OK).json({tasks, count:tasks.length});
}

const getOneTask = async(req,res) => {
    const {
    user: { userId },
    params: { id: taskId },
  } = req

  const task = await Task.findOne({
   where: {
    [Op.and] : [{UserId:userId},{taskid:taskId}],
   },
  });

  if (!task) {
    throw new NotFoundError(`No job with id ${taskId}`);
  }
  res.status(StatusCodes.OK).json({ task });
}


const createTasks = async(req,res) =>{
    const {userId} = req.user;
    const{date,month,year} = req.body;
    const endDate = new Date(Number(year),Number(month),Number(date),23,59,0);

    const task = await Task.create({...req.body,endDate,UserId:userId});

    res.status(StatusCodes.CREATED).json({task});
}

const editTasks = async(req,res) => {
    const {
        user:{userId},
        body:{description,status},
        params : {id :taskId}
    } =req;

    if(description){
        if(description === ''){
            throw new BadRequestError('Please enter valid description');
        }
     const task = await Task.findByPk(taskId);
     if(!task) throw new BadRequestError(`No task with id:${taskId}`);

     task.description = description;
     await task.save();
     return res.status(StatusCodes.OK).json({task});

    }
    if(status){
        if(status === ''){
            throw new BadRequestError('Invalid Status');
        }

        const task = await Task.findByPk(taskId);
        if(!task) throw new BadRequestError(`No task with id:${taskId}`);

        task.status = status;
        await task.save();
        return res.status(StatusCodes.OK).json({task});
    }
    return res.status(StatusCodes.OK).json({updation:false});
}

const deleteTasks = async(req,res) =>{
    const{
        user: {userId},
        params:{id: taskId},
    } = req;

    const task = await Task.destroy({
        where:{
            [Op.and] :[{UserId:userId},{taskid:taskId}],
        },
    });

    if (!task) {
    throw new NotFoundError(`No job with id ${taskId}`);
  }
   res.status(StatusCodes.OK).send('record deleted');
}

module.exports = {
    getTasks , 
    getOneTask,
    createTasks,
    editTasks,
    deleteTasks,
}