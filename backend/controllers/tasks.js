const Task = require('../models/tasks');
const {StatusCodes} = require('http-status-codes');

//const date = new Date(2024,3,22,15,30,0);

const getTasks = async(req,res) => {
    res.send("hello get");
}


const createTasks = async(req,res) =>{
    const {UserId} = req.user;
    const{date,month,year} = req.body;
    const endDate = new Date(date,month,year);

    const task = await Task.create({...req.body,endDate,UserId});

    res.status(StatusCodes.CREATED).json({task});
}

const editTasks = async(req,res) => {
    res.send("hello patch");
}

const deleteTasks = async(req,res) =>{
    res.send("hello delete");
}

module.exports = {
    getTasks , 
    createTasks,
    editTasks,
    deleteTasks,
}