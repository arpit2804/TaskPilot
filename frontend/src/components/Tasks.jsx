import { useEffect, useState } from 'react'
import React from 'react';
import {Routes, Route, useParams } from 'react-router-dom'
import CreateTasks from '../components/CreateTasks';
import ListTasks from '../components/ListTasks';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import logo from '../assets/taskpilot.png'
//import ViewTask from './ViewTask';

export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [created,setCreated] = useState(false);
    const [deleted,setDeleted] = useState(false);

    const token = localStorage.getItem('jwt');

    useEffect(()=>{
          const fetchTasks = async ()=>{
      try {
          fetch('http://localhost:3000/api/v1/tasks',
          {
              method: 'GET',
              headers: {
                  'Content-Type' : 'application/json;charset=utf-8',
                  'Authorization' : `Bearer ${token}`
              },
          })
          .then(res=>res.json()).then((result)=>{
              console.log(result);
              setTasks(result.tasks);
          })
      } catch (error) {
          console.log("error",error);
      }
    }
     fetchTasks();
    },[created,deleted]);


    //console.log("tasks",tasks);
  
    return (
      <>
      {/* <div>
        <Routes>
          <Route exact path = '/tasks/:id' element={<ViewTask tasks={tasks}/>}/>
        </Routes>
      </div> */}
    <div className='h-screen bg-black'>
      <DndProvider backend={HTML5Backend}>
        {/* logo */}
        <div className='h-24 w-56 p-4'>
            <img src={logo}/>
        </div>
        {/* header */}
        <div className='flex justify-center items-center w-full'>
        <div className=' bg-gradient-to-r from-[#ff6cab] via-[#BD69D2] to-[#7766FD] font-poppins text-4xl font-bold inline-block text-transparent bg-clip-text'>
            Navigate Your Tasks With Style!
        </div>
        </div>
        <CreateTasks tasks = {tasks} setTasks = {setTasks} setCreated={setCreated}/>
        <ListTasks  tasks = {tasks} setTasks = {setTasks} setDeleted={setDeleted}/>
      </DndProvider>
      </div>
      </>
    )
}


// const ViewTask  = ({tasks}) =>{

//   const {id} = useParams()
//   console.log("id: ",id);


//   return (
//     <div id="container"
//     onClick={handleOnClose}
//     className="absolute z-50 inset-0  bg-opacity-25 backdrop-blur-sm flex  items-center justify-center">
//         <div className=' bg-slate-900 p-2 rounded w-92 flex flex-col text-white justify-center '>
//             <div className='flex justify-center px-20'>
//             <div className=' bg-gradient-to-r from-[#ff6cab] via-[#BD69D2] to-[#7766FD] font-poppins text-4xl font-bold inline-block text-transparent bg-clip-text'>
//                 Task Name
//             </div>
//             </div>
           
//         </div>
//     </div>
//   );
// }
