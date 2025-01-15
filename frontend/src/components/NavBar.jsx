import React from 'react'
import logo from "../assets/logo.png"
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';


const NavBar = () => {
 const navigate = useNavigate();
  return (
    <div className='w-full h-[60px] justify-between items-center text-white bg-[#16404D] border-b-[1px] border-white border-dashed flex absolute'>

    <div className="left justify-start w-[20%] gap-4 flex items-center h-full pl-8">
     <img src={logo} alt="" className='w-[28px] text-white'/>
      <h1 className='text-xl font-bold text-white content-center'>Blogify</h1>
    </div>

    <div className="mid gap-10 flex w-[80%] h-full justify-end items-center text-md font-semibold pr-10">
    <Link to="/">Home</Link>
    <Link to="/addblog">Add Blogs</Link>
    <Link to="/profile">Profile</Link>

    <button className="flex justify-center items-center text-white text-lg font-medium rounded-md border-[1px] border-dashed border-white pl-2 pr-2 pt-[1px] pb-[1px] cursor-pointer" type="button" onClick={()=>{navigate("/login")}}>Sign In</button>
    </div>

    
    </div>
  )
}

export default NavBar
