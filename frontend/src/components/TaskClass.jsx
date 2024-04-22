import React from 'react'
import banner from '../assets/init.png'
import { Link } from 'react-router-dom';

export default function TaskClass() {
    return (
        <div className="bg-black flex flex-col justify-center items-center p-11 h-screen">
            <div className="bg-gradient-to-r from-[#ff6cab] via-[#BD69D2] to-[#7766FD] font-poppins text-6xl font-bold inline-block text-transparent bg-clip-text mb-10">
                Choose either
            </div>
            <img src={banner} alt="" className="hidden sm:flex w-[49%] h-[25rem]" />
            <div className="flex flex-col md:gap-20 items-center sm:flex-row sm:items-center md:text-xl mt-4 ">
                <Link to="/classes">
                    <button className="bg-gradient-to-r from-[#ff6cab] via-[#BD69D2] to-[#7766FD] text-white p-4 m-4 rounded-lg font-bold hover:scale-105 duration-300">
                        Schedule Classes
                    </button>
                </Link>
                <Link to="/tasks">
                    <button className="bg-gradient-to-r from-[#ff6cab] via-[#BD69D2] to-[#7766FD] text-white p-4 m-4 rounded-lg font-bold hover:scale-105 duration-300">
                        Add Tasks
                    </button>
                </Link>
            </div>
        </div>
    );
}
