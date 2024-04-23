import { useState,useEffect } from 'react'
import React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import logo from '../assets/taskpilot.png'
import CreateClasses from './CreateClasses';
import { Link } from 'react-router-dom';
import ListClasses from '../components/ListClasses'


export default function Classes() {
    const [classes, setClasses] = useState([]);
    const [created,setCreated] = useState(false);
    const [deleted,setDeleted] = useState(false);

    const token = localStorage.getItem('jwt');

    useEffect(()=>{
          const fetchClasses = async ()=>{
      try {
           fetch('http://localhost:3000/api/v1/classes',
          {
              method: 'GET',
              headers: {
                  'Content-Type' : 'application/json;charset=utf-8',
                  'Authorization' : `Bearer ${token}`
              },
          })
          .then(res=>res.json()).then((result)=>{
              console.log(result);
              setClasses(result.classes);
          })
      } catch (error) {
          console.log("error",error);
      }
    }
     fetchClasses();
    },[created,deleted]);

   // console.log("classes",classes);
  
    return (
    <div className='h-screen bg-black'>
      <DndProvider backend={HTML5Backend}>
        {/* logo */}
        <div className='h-24 w-56 p-4'>
          <Link to='/home'>
            <img src={logo}/>
            </Link>
        </div>
        {/* header */}
        <div className='flex justify-center items-center w-full'>
        <div className=' bg-gradient-to-r from-[#ff6cab] via-[#BD69D2] to-[#7766FD] font-poppins text-4xl font-bold inline-block text-transparent bg-clip-text'>
            Class Schedules Perfected!
        </div>
        </div>
        <CreateClasses classes = {classes} setClasses = {setClasses} setCreated={setCreated}/>
        <ListClasses  classes = {classes} setClasses = {setClasses} setDeleted={setDeleted}/>
      </DndProvider>
      </div>
    )
}
