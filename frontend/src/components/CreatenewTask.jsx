import React, {useEffect,useState} from 'react'
import {v4 as uuidv4} from 'uuid';

export default function CreatenewTask({ visible, onClose, tasks, setTasks,setCreated }) {
    const [clicked, setClicked] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [deadline, setDeadline] = useState(new Date());

    const token = localStorage.getItem('jwt');
    const handleOnClose = (e) => {
        if (e.target.id === "container") {
            onClose();
            setClicked(false);
        }
    };

    // const [task, setTask] = useState({
    //     name : "",
    //     description: "",
    //     deadline: "",
    //     status: "pending",
    // })

    const createTask = async (data)=>{
      try {
          await fetch('http://localhost:3000/api/v1/tasks',
          {
              method: 'POST',
              headers: {
                  'Content-Type' : 'application/json;charset=utf-8',
                  'Authorization' : `Bearer ${token}`
              },
              body : JSON.stringify(data),
          })
          .then(res=>res.json()).then((result)=>{
              console.log(result);
              setCreated(true);
              console.log("true set",Date.now())
              setTasks([...tasks, result.task]);
              return result.task;
          })
      } catch (error) {
          console.log("error",error);
      }
    }

    // const fetchTasks = async ()=>{
    //   try {
    //       await fetch('http://localhost:3000/api/v1/tasks',
    //       {
    //           method: 'GET',
    //           headers: {
    //               'Content-Type' : 'application/json;charset=utf-8',
    //               'Authorization' : `Bearer ${token}`
    //           },
    //       })
    //       .then(res=>res.json()).then((result)=>{
    //           console.log(result);
    //           setTasks(result.tasks);
    //       })
    //   } catch (error) {
    //       console.log("error",error);
    //   }
    // }

    //console.log(task)

    const handleSubmit = (e) =>{
        e.preventDefault();
        // task.name = taskName,
        // task.description = taskDescription,
        // task.deadline = deadline,
        console.log(deadline);
        const data = {
            name : taskName,
            description: taskDescription,
            year: Number(deadline.split('-')[0]),
            month:Number(deadline.split('-')[1]),
            date: Number(deadline.split('-')[2])
        }
         const newTask = createTask(data);
         //setTasks(prevTasks => [...prevTasks,newTask]);
         //     return list
         // })
         document.getElementById("container").click();
         //fetchTasks();
    }

    if (!visible) return null;

  return (
    <div id="container"
    onClick={handleOnClose}
    className="absolute z-50 inset-0  bg-opacity-25 backdrop-blur-sm flex  items-center justify-center">
        <div className=' bg-slate-900 p-2 rounded w-92 flex flex-col text-white justify-center '>
            <div className='flex justify-center px-20'>
            <div className=' bg-gradient-to-r from-[#ff6cab] via-[#BD69D2] to-[#7766FD] font-poppins text-4xl font-bold inline-block text-transparent bg-clip-text'>
                Add Task
            </div>
            </div>
            <div className='flex mt-5 w-full justify-start p-4'>
        <form onSubmit={handleSubmit}>
        <div className='flex-col gap-5'>
            <div className='flex-col'>
            <div className='text-[#ff6cab] font-poppins fonr-bold'>Task Name</div>
            <input
                type="text"
                className='border-2 border-slate-200 mt-2  h-8 w-64 rounded-md px-1 bg-slate-800'
                onChange={(e)=>{
                    setTaskName(e.target.value)
                }} 
            />
            </div>
            <div className='flex-col'>
            <div className='text-[#ff6cab] font-poppins fonr-bold mt-4'>Task Desciption</div>
            <input
                type="text"
                className='border-2 border-slate-200 h-16 w-64 rounded-md px-1 bg-slate-800'
                onChange={(e)=>{
                    setTaskDescription(e.target.value)
                }} 
            />
            </div>
            <div className='flex-col'>
            <div className='text-[#ff6cab] font-poppins fonr-bold mt-4'>Task Deadline</div>
            <input
                type="date"
                className='border-2 border-slate-200 h-8 w-40 rounded-md px-1 bg-slate-800 '
                onChange={(e)=>{
                    setDeadline(e.target.value)
                }} 
            />
            </div>
            <div className='flex justify-between mt-4 items-center gap-3'>
            <button 
            type='submit'
            // onClick={()=>setClicked(true)}
            className=' bg-gradient-to-r from-[#ff6cab] via-[#BD69D2] to-[#7766FD] rounded-md px-4 h-8 w-36 hover:scale-110 duration-300'>
                Create
            </button>
            <button 
            onClick={() => {
                document
                    .getElementById("container")
                    .click();
            }}
            className=' bg-gradient-to-r from-[#7766FD] via-[#BD69D2] to-[#ff6cab] rounded-md px-4 h-8 w-36 hover:scale-110 duration-300'>
                Cancel
            </button>
            </div>
        </div>
        </form>
      
    </div>
        </div>
    </div>
  )
}
