import React, { useState } from 'react'
import {v4 as uuidv4} from 'uuid';
import { FaPlus } from "react-icons/fa";
import CreatenewTask from './CreatenewTask';

function CreateTasks({tasks, setTasks}) {


    const [showMyModel, setShowMyModal] = useState(false);
    const handleOnClose = () => setShowMyModal(false);

    

  return (
    <div>
        <div className='flex justify-center items-center mt-6'>
        <button 
        onClick={() => setShowMyModal(true)}
        className='bg-gradient-to-r from-[#ff6cab] via-[#BD69D2] to-[#7766FD] h-[40px] rounded-lg hover:scale-110 duration-300'>
            <div className='flex py-1 px-3 items-center gap-1'>
                <div className='text-xl font-bold'><FaPlus/></div>
                <div className='text-lg font-bold font-poppins'>Create Task</div>
            </div>
        </button>
        </div>
        <CreatenewTask onClose={handleOnClose} visible={showMyModel} tasks = {tasks} setTasks = {setTasks}/>
    
    </div>
  )
}

export default CreateTasks
