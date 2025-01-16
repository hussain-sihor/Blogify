import React, { useEffect, useState } from 'react'
import logo from "../assets/logo.png"
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';


const NavBar = () => {
 const navigate = useNavigate();


 const [user,setUser]= useState({});
 const [flag,setFlag] = useState(false);

 useEffect(()=>{
   const getUser = async()=>{
        const token = localStorage.getItem("token");
        try{
          const res = await axios.get("http://localhost:3000/api/users/user",{
            headers:{
              Authorization:`Bearer ${token}`
            }
          });
          
        if(res.status == 200){
         setLogin(true);
          const userData = res.data;
          setUser(userData);
        }
        }catch(err){
         console.log(err);
        }

   }
   getUser();
 },[flag])


 const [login,setLogin]= useState(false);
  return (
    <div className='w-full h-[60px] justify-between items-center text-white bg-[#16404D] border-b-[1px] border-white border-dashed flex absolute'>

    <div className="left justify-start w-[20%] gap-4 flex items-center h-full pl-8">
     <img src={logo} alt="" className='w-[28px] text-white'/>
      <h1 className='text-xl font-bold text-white content-center'>Blogify</h1>
    </div>

    <div className="mid gap-10 flex w-[80%] h-full justify-end items-center text-md font-semibold pr-10" onClick={()=>{setFlag(!flag)}}>
    <Link to="/">Home</Link>
    <Link to="/addblog">Add Blog</Link>
    <Link to="/profile">My Blogs</Link>

  {! login ?   
  <button className="flex justify-center items-center text-white text-md font-medium rounded-md border-[1px] border-dashed border-white pl-2 pr-2 pt-[1px] pb-[1px] cursor-pointer" type="button" onClick={()=>{navigate("/login")}}>Sign In</button> : 

  <button className="flex justify-center items-center text-white text-md font-medium rounded-md border-[1px] border-dashed border-white pl-2 pr-2 pt-[1px] pb-[1px] cursor-pointer" type="button" onClick={()=>{
    localStorage.removeItem("token");
    navigate(0);
  }}>Log Out</button>}
    </div>

    
    </div>
  )
}

export default NavBar
