
const getClass = async(req,res) => {
    res.send("hello get");
}

const getOneClass = async(req,res) =>{
    res.send("hello get one");
}

const createClass = async(req,res) =>{
    res.send("hello post");
}

const editClass = async(req,res) => {
    res.send("hello patch");
}

const deleteClass = async(req,res) =>{
    res.send("hello delete");
}

module.exports = {
getClass,
getOneClass,
createClass,
editClass,
deleteClass
}