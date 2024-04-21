
const getClass = async(req,res) => {
    res.send("hello get");
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
createClass,
editClass,
deleteClass
}