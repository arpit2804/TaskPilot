import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

export default function CreateNewClass({ visible, onClose, classes, setClasses, setCreated }) {
    const [taskName, setTaskName] = useState("");
    //const [taskDescription, setTaskDescription] = useState("");
    const [startTime,setStartTime] = useState(null);
    const [endTime,setEndTime] = useState(null);
    const [deadline, setDeadline] = useState(new Date());
    const token = localStorage.getItem('jwt');

    const handleOnClose = (e) => {
        if (e.target.id === "container") {
            onClose();
        }
    };

    // const [task, setTask] = useState({
    //     id: "",
    //     name: "",
    //     description: "",
    //     deadline: "",
    //     status: "pending",
    // })

    //console.log(task)

    const createClass = async (data)=>{
      try {
          await fetch('http://localhost:3000/api/v1/classes',
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
              setClasses([...classes, result.newclass]);
              return result.newclass;
          })
      } catch (error) {
          console.log("error",error);
      }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(deadline);
        const data = {
            name : taskName,
            Date: deadline,
            startTime: startTime,
            endTime: endTime
        }
        console.log(typeof(startTime));
        console.log(data);
        const newClass = createClass(data);
        
        document.getElementById("container").click();
    }

    if (!visible) return null;

    return (
        <div id="container"
            onClick={handleOnClose}
            className="absolute z-50 inset-0  bg-opacity-25 backdrop-blur-sm flex  items-center justify-center">
            <div className=' bg-slate-900 p-2 rounded w-92 flex flex-col text-white justify-center '>
                <div className='flex justify-center px-20'>
                    <div className=' bg-gradient-to-r from-[#ff6cab] via-[#BD69D2] to-[#7766FD] font-poppins text-4xl font-bold inline-block text-transparent bg-clip-text'>
                        Schedule Class
                    </div>
                </div>
                <div className='flex mt-5 w-full justify-start p-4'>
                    <form onSubmit={handleSubmit}>
                        <div className='flex-col gap-5'>
                            <div className='flex-col'>
                                <div className='text-[#ff6cab] font-poppins fonr-bold'>Course Name</div>
                                <input
                                    type="text"
                                    className='border-2 border-slate-200 mt-2  h-8 w-64 rounded-md px-1 bg-slate-800'
                                    onChange={(e) => {
                                        setTaskName(e.target.value)
                                    }}
                                />
                            </div>
                            <div className='flex items-center justify-between gap-8'>
                                <div>
                                    <div className='flex-col'>
                                        <div className='text-[#ff6cab] font-poppins fonr-bold mt-4'>Start Time</div>
                                        <input
                                            type="time"
                                            className='border-2 border-slate-200 h-8 w-40 rounded-md px-1 bg-slate-800 '
                                            onChange={(e) => {
                                                setStartTime(e.target.value)
                                            }}
                                        />
                                    </div>
                                </div>
                                <div>
                                <div className='flex-col'>
                                        <div className='text-[#ff6cab] font-poppins fonr-bold mt-4'>End Time</div>
                                        <input
                                            type="time"
                                            className='border-2 border-slate-200 h-8 w-40 rounded-md px-1 bg-slate-800 '
                                            onChange={(e) => {
                                                setEndTime(e.target.value)
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex-col'>
                                <div className='text-[#ff6cab] font-poppins fonr-bold mt-4'>Date Scheduled</div>
                                <input
                                    type="date"
                                    className='border-2 border-slate-200 h-8 w-40 rounded-md px-1 bg-slate-800 '
                                    onChange={(e) => {
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
