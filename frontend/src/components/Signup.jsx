import React, { useState } from 'react'
import logo from '../assets/taskpilot.png'
import banner from '../assets/Login_banner.png'
import { FaRegUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Signup() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");



    const handleSubmit = async(e) =>{
        e.preventDefault()
        const data = {
            name : name,
            phoneNumber: phone,
            email: email,
            password: password,
        }
        try {
            
            await fetch('http://localhost:3000/api/v1/auth/register',
            {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json;charset=utf-8',
                },
                body: JSON.stringify(data),
            })
            .then(res=>res.json()).then((result)=>{
                console.log(result)
                window.location.replace('/home')
            })
        } catch (error) {
            console.log("error",error);
        }
    }


  return (
    <div className="h-screen bg-black">
          <div className="flex justify-between">
            <div>
              <img
                src={logo}
                className="pr-3 pl-5 h-12 w-44 pt-4 cursor-pointer hover:scale-105 duration-300 "
              />
            </div>
            <div className="mt-4 pr-6">
              <button className="text-black font-semibold  bg-gradient-to-r from-[#ff6cab] via-[#BD69D2] to-[#7766FD] hover:scale-110 duration-300 rounded-lg px-6 py-1 mx-3">
                HOME
              </button>
              <button className="text-black font-semibold bg-gradient-to-r from-[#ff6cab] via-[#BD69D2] to-[#7766FD] hover:scale-110 duration-300 rounded-lg px-6 py-1 mx-3">
                <Link to='/login'>
                Login
                </Link>
              </button>
            </div>
          </div>
          <div className="bg-[#1f1f1f] h-[75%] my-[3rem] mx-[12rem] rounded-2xl flex flex-col items-center">
            <div className="text-[2.7rem] text-white mt-2">SIGNUP</div>
            <div className="flex items-center justify-center w-full my-7">
            <form
            onSubmit={handleSubmit} 
            >
              <div className="flex flex-col items-center w-[50%] justify-around h-[100%] border-r-2 border-[#A1A1A1] px-4 py-6 pt-14">
                <div className="flex flex-col w-full  items-center justify-around h-[80%]">
                  <input
                    placeholder="Name"
                    type='text'
                    onChange={(e)=>{
                        setName(e.target.value)
                    }} 
                    className="w-[75%] bg-[#1f1f1f] text-[#A1A1A1] border-0 border-b-2 border-[#A1A1A1] placeholder:text-[#A1A1A1] text-xl placeholder:text-2xl placeholder:text-center focus:outline-none"
                  />
                  <div className="w-full flex flex-col justify-center items-center ">
                    <input
                      placeholder="johndoe@example.com"
                      type = "email"
                      onChange={(e)=>{
                        setEmail(e.target.value)
                    }} 
                      className="w-[75%] bg-[#1f1f1f] text-[#A1A1A1] border-0 border-b-2 border-[#A1A1A1] placeholder:text-[#A1A1A1] text-xl placeholder:text-2xl placeholder:text-center mt-8 focus:outline-none"
                    />
                     <input
                      placeholder="Phone "
                      type = 'text'
                      onChange={(e)=>{
                        setPhone(e.target.value)
                    }} 
                      className="w-[75%] bg-[#1f1f1f] text-[#A1A1A1] border-0 border-b-2 border-[#A1A1A1] placeholder:text-[#A1A1A1] text-xl placeholder:text-2xl placeholder:text-center mt-8 focus:outline-none"
                    />
                     <input
                      placeholder="Password"
                      type='password'
                      onChange={(e)=>{
                        setPassword(e.target.value)
                    }} 
                      className="w-[75%] bg-[#1f1f1f] text-[#A1A1A1] border-0 border-b-2 border-[#A1A1A1] placeholder:text-[#A1A1A1] text-xl placeholder:text-2xl placeholder:text-center mt-8 focus:outline-none"
                    />
                    <div className=" text-white w-[75%] mt-4">
                      By proceeding, You agree with our{" "}
                      <span className="text-[#FFA900]">
                        {" "}
                        <a className='hover:underline cursor-pointer'> Terms of Service <span className='text-white'>&</span> Conditions</a>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="h-[20%] flex flex-col justify-end mt-4">
                  <button 
                  type='submit'
                  className="py-1 px-12 text-black font-semibold bg-gradient-to-r from-[#ff6cab] via-[#BD69D2] to-[#7766FD] rounded-3xl text-xl hover:scale-110 duration-300">
                    Signup
                  </button>
                </div>
              </div>
              </form>
              <div className="w-[50%] flex justify-center items-center">
                <img src={banner} />
              </div>
            </div>
          </div>
        </div>
  )
}
