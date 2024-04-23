import React, { useEffect, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd';
import { MdDelete } from "react-icons/md";

export default function ListClasses({ classes, setClasses,setDeleted }) {
    const [pending, setPending] = useState([]);
    const [missed, setMissed] = useState([]);
    const [ongoing, setOngoing] = useState([]);
    const [completed, setCompleted] = useState([]);

    useEffect(() => {
        console.log(classes)
         const fpending = classes.filter((task) => task.status == 'pending')
        const fmissed = classes.filter((task) => task.status == 'missed')
        const fongoing = classes.filter((task) => task.status == 'ongoing')
        const fcompleted = classes.filter((task) => task.status == 'completed')

        setPending(fpending);
        setMissed(fmissed);
        setCompleted(fcompleted);
        setOngoing(fongoing);
    }, [classes])

    const statuses = ['pending', 'missed', 'ongoing', 'completed'];
    return (
        <div>
            <div className='flex justify-around mx-5 mt-10 items-start  '>
                {statuses.map((status, index) => <Section key={index} status={status} classes={classes} setClasses={setClasses} pending={pending}
                    ongoing={ongoing} completed={completed} missed={missed} setDeleted={setDeleted} />)}
            </div>
        </div>
    )
}

const Section = ({ status,
    classes,
    setClasses,
    pending,
    ongoing,
    completed,
    missed,
    setDeleted
}) => {

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item)=>addItemToSection(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))

    //console.log("Over", isOver)
    


    let text = "pending";
    let bg = "bg-slate-500";
    let classestomap = pending;

    if (status === 'completed') {
        text = "completed";
        bg = "bg-green-500";
        classestomap = completed;
    }

    if (status === 'missed') {
        text = "missed";
        bg = "bg-red-500";
        classestomap = missed;
    }

    if (status === 'ongoing') {
        text = "ongoing";
        bg = "bg-blue-300";
        classestomap = ongoing;
    }

    const addItemToSection = (id) =>{
        setClasses((prev)=>{
            const mClasses = prev.map(t=>{
                if(t.classId === id){
                    return {...t, status: status}
                }
                return t;
            })
            return mClasses;
        })
    }

    return (
        <div ref={drop} className={`w-64 rounded-md ${isOver? "bg-slate-200": " bg-transparent"} p-2`}>
            <div className='flex items-center justify-center '>
                <Header text={text} bg={bg} count={classestomap.length} />
            </div>
            <div>

                {classestomap.length > 0 && classestomap.map((task) => <Task key={task.classId} classes={classes} setClasses={setClasses} task={task} setDeleted={setDeleted} />)}
            </div>

        </div>
    )
}

const Header = ({ text, bg, count }) => {
    return (
        <div className={`${bg} flex items-center h-12 p-4 rounded-md uppercase text-sm text-white w-full justify-between`}>
            {text}
            <div className='bg-white ml-2 w-5 h-5 text-black rounded-full justify-center flex items-center'>
                {count}
            </div>
        </div>
    )
}

const Task = ({ classes, setClasses, task,setDeleted }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: {id: task.classId},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    const handleDelete = async(id)=>{
        console.log(id);
        const token = localStorage.getItem('jwt');
        try {
          await fetch(`http://localhost:3000/api/v1/classes/${id}`,
          {
              method: 'DELETE',
              headers: {
                  'Content-Type' : 'application/json;charset=utf-8',
                  'Authorization' : `Bearer ${token}`
              },
          })
          .then(res=>res.json()).then((result)=>{
              console.log(result);
              setDeleted((prev)=> !prev);
              //setTasks([...tasks, result.task]);
              //return result.task;
          })
      } catch (error) {
          console.log("error",error);
          //setDeleted(true);
      }
    }
    // console.log(item.id)

    //console.log(task.id)

    //   console.log(<isDragging></isDragging>)
    return (
        <div
            // onClick={}
            ref={drag}
            className={`relative p-4 mt-4 shadow-md text-white font-bold bg-[#1f1f1f] rounded-md cursor-grab ${isDragging ? "opacity-25" : "opacity-100"} hover:scale-110 duration-300`}>
            <div className='flex justify-between items-center'>
            <p>{task.name}</p>
            <button>
                <div className=' text-red-600 text-xl'><MdDelete onClick={()=>handleDelete(task.classId)}/></div>
            </button>
            </div>
        </div>
    )
}
