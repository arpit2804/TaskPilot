import React, { useState } from 'react'

export default function CreatenewTask({ visible, onClose, task }) {
    const [clicked, setClicked] = useState(false);
    const [edit, setEdit] = useState(false);
    const id = task.id

    const handleOnClose = (e) => {
        if (e.target.id === "container") {
            onClose();
            setClicked(false);
        }
    };



    if (!visible) return null;

    return (
        <div id="container"
            onClick={handleOnClose}
            className="absolute z-50 inset-0  bg-opacity-25 backdrop-blur-sm flex  items-center justify-center">
            <div className=' bg-slate-900 p-2 rounded w-80 flex flex-col justify-center '>
                <div className='flex justify-center px-10'>
                    <div className=' bg-gradient-to-r from-[#ff6cab] via-[#BD69D2] to-[#7766FD] font-poppins text-4xl font-bold inline-block text-transparent bg-clip-text w-'>
                        Edit Task
                    </div>
                </div>
                {/* Name */}
                <div className=' p-2  text-white font-poppins text-xl font-bold  mt-3'>{task.name}</div>

                {/* description */}
                {edit ? <div>
                    <div className='flex-col'>
                        <div className='text-[#ff6cab] font-poppins fonr-bold mt-4'>Task Desciption</div>
                        <input
                            type="text"
                            className='border-2 border-slate-200 h-16 w-64 rounded-md px-1 bg-slate-800'
                        />
                    </div>
                </div>
                    : <div className='p-2 text-white  font-poppins text-sm font-semibold w mt-3'>{task.description}</div>}

                {/* deadline */}
                <div className='text-sm text-red-500 mt-4 font-semibold'> Deadline: {task.endDate.split('T')[0]}</div>
                {/* buttons */}
                <div className='flex justify-between mt-4 items-center gap-3'>
                    <button
                        type='submit'
                        onClick={() => setEdit((prev) => !prev)}
                        className=' bg-gradient-to-r from-[#ff6cab] via-[#BD69D2] to-[#7766FD] rounded-md px-4 h-8 w-36 hover:scale-110 duration-300'>
                        {edit ? 'Save' : 'Edit'}
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
        </div>
    )
}
