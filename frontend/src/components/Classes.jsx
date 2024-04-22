import { useState } from 'react'
import React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import logo from '../assets/taskpilot.png'
import CreateClasses from './CreateClasses';
import ListClasses from '../components/ListClasses'


export default function Classes() {
    const [classes, setClasses] = useState([]);

    console.log("classes",classes);
  
    return (
    <div className='h-screen bg-black'>
      <DndProvider backend={HTML5Backend}>
        {/* logo */}
        <div className='h-16 w-40 p-4'>
            <img src={logo}/>
        </div>
        {/* header */}
        <div className='flex justify-center items-center w-full'>
        <div className=' bg-gradient-to-r from-[#ff6cab] via-[#BD69D2] to-[#7766FD] font-poppins text-4xl font-bold inline-block text-transparent bg-clip-text'>
            Class Schedules Perfected!
        </div>
        </div>
        <CreateClasses classes = {classes} setClasses = {setClasses}/>
        <ListClasses  classes = {classes} setClasses = {setClasses}/>
      </DndProvider>
      </div>
    )
}
