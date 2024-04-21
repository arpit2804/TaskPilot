const Task = require('../models/tasks');

const date = new Date(2024,3,22,15,30,0);

const getTasks = async(req,res) => {
    res.send("hello get");
}


const createTasks = async(req,res) =>{
    const {userId} = req.user;
    const task = await Task.create({...req.body,endDate:date,UserId:userId});
    res.status(201).json(task);
    //res.send("hello post");
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