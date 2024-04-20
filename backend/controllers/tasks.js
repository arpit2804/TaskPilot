const Task = require('../models/tasks');

const getTasks = async(req,res) => {
    res.send("hello get");
}


const createTasks = async(req,res) =>{
    res.send("hello post");
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