import React, { useEffect, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd';
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import ViewTask from '../components/ViewTask'

export default function ListTasks({ tasks, setTasks , setDeleted }) {
    const [pending, setPending] = useState([]);
    const [missed, setMissed] = useState([]);
    const [ongoing, setOngoing] = useState([]);
    const [completed, setCompleted] = useState([])

    useEffect(() => {
        const fpending = tasks.filter((task) => task.status == 'pending')
        const fmissed = tasks.filter((task) => task.status == 'missed')
        const fongoing = tasks.filter((task) => task.status == 'ongoing')
        const fcompleted = tasks.filter((task) => task.status == 'completed')

        setPending(fpending);
        setMissed(fmissed);
        setCompleted(fcompleted);
        setOngoing(fongoing);
    }, [tasks])

    const statuses = ['pending', 'missed', 'ongoing', 'completed'];
    return (
        <div>
            <div className='flex justify-around mx-5 mt-10 items-start  '>
                {statuses.map((status, index) => <Section key={index} status={status} tasks={tasks} setTasks={setTasks} pending={pending}
                    ongoing={ongoing} completed={completed} missed={missed} setDeleted={setDeleted} />)}
            </div>
        </div>
    )
}

const Section = ({ status,
    tasks,
    setTasks,
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
    let taskstomap = pending;

    if (status === 'completed') {
        text = "completed";
        bg = "bg-green-500";
        taskstomap = completed;
    }

    if (status === 'missed') {
        text = "missed";
        bg = "bg-red-500";
        taskstomap = missed;
    }

    if (status === 'ongoing') {
        text = "ongoing";
        bg = "bg-blue-300";
        taskstomap = ongoing;
    }

    const addItemToSection = (id) =>{
        setTasks((prev)=>{
            const mTasks = prev.map(t=>{
                if(t.taskid === id){
                    return {...t, status: status}
                }
                return t;
            })
            return mTasks;
        })
    }



    return (
        <div ref={drop} className={`w-64 rounded-md ${isOver? "bg-slate-200": " bg-transparent"} p-2`}>
            <div className='flex items-center justify-center '>
                <Header text={text} bg={bg} count={taskstomap.length} />
            </div>
            <div>

                {taskstomap.length > 0 && taskstomap.map((task) => <Task key={task.taskid}  task={task} setDeleted={setDeleted}/>)}
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

const Task = ({ task , setDeleted}) => {
    //console.log(task.taskid);
    const [showMyModel, setShowMyModal] = useState(false);
    const handleOnClose = () => setShowMyModal(false);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: {id: task.taskid},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    const handleDelete = async(id)=>{
        console.log(id);
        const token = localStorage.getItem('jwt');
        try {
          await fetch(`http://localhost:3000/api/v1/tasks/${id}`,
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
    //console.log(item.id)

    //console.log(task.id)

    //   console.log(<isDragging></isDragging>)
    return (
        <div onDoubleClick={() => setShowMyModal(true)}>
        <div
            // onClick={}
            ref={drag}
            className={`relative p-4 mt-4 shadow-md text-white font-bold bg-[#1f1f1f] rounded-md cursor-grab ${isDragging ? "opacity-25" : "opacity-100"} hover:scale-110 duration-300`}
            
            >
            
            <div className='flex justify-between items-center'>
            <p>{task.name}</p>
            <button>
                <div className=' text-red-600 text-xl'><MdDelete onClick={()=>handleDelete(task.taskid)} /></div>
            </button>
            </div>
            </div>
            <ViewTask onClose={handleOnClose} visible={showMyModel} task = {task} />
        </div>
    )
}