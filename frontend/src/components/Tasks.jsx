import { useState } from 'react'
import React from 'react';
import CreateTasks from '../components/CreateTasks';
import ListTasks from '../components/ListTasks';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import logo from '../assets/taskpilot.png'

export default function Tasks() {
    const [tasks, setTasks] = useState([]);

    console.log("tasks",tasks);
  
    return (
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
        <CreateTasks tasks = {tasks} setTasks = {setTasks}/>
        <ListTasks  tasks = {tasks} setTasks = {setTasks}/>
      </DndProvider>
      </div>
    )
}
