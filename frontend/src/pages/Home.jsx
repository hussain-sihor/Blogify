import React, { useEffect, useState } from 'react'
import bg from '../assets/bg.png'
import { AiFillLike } from "react-icons/ai";
import axios from 'axios';
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();
  const [blogs,setBlogs]= useState([]);


  useEffect(()=>{
    const getBlogs = async()=>{
      const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/blogs/getblogs",{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
        console.log("ress",res);
        
      if(res.status == 200){
        const blogList = res.data.message;
        setBlogs(blogList);
      }
    }

    getBlogs();
  },[])

  return (
    <div className='w-full bg-[#FBF5DD] flex justify-start items-center flex-col'>

{/* Header  */}
      <div className='w-full bg-[#A6CDC6] flex  items-center mt-[60px] py-10'>

      <div className='w-[50%]  flex justify-start items-center h-full pl-20'>

       <div className='w-[80%] h-[70%] flex justify-center items-start flex-col gap-2'>
       <h1 className='text-3xl font-bold text-black content-center'>Discover stories, ideas, and insights.</h1>
       <h1 className='text-md font-medium text-black content-center'><span className='text-[#092b35] text-lg font-bold'>Blogify</span> is your gateway to expressing, discovering, <br></br> and sharing ideas with the world.</h1>
       <button className="mt-5 px-12 py-2  bg-[#DDA853] text-lg text-[#092b35] rounded-md font-bold border-2 border-[#092b35] max-sm:w-[30%] max-sm:text-sm max-sm:px-0" onClick={()=>{
        navigate("/addblog")
       }}>
							Explore
						</button>
       </div>
      </div>

      <div className='w-[50%]  flex justify-start items-center'>

       <div className='w-full h-[70%] flex justify-center items-start flex-col pl-20'>
     <img src={bg} alt="" className='w-[80%] h-64 rounded-lg shadow-xl'/>
       </div>
      </div>
      </div>

{/* Featured  */}
      <div className='w-full  flex justify-start items-center py-10'>

      <div className='w-[70%]  flex justify-start items-center h-full pl-16 gap-8'>
         <div>
          <h1 className='text-2xl font-bold text-black content-center'>Blog Ides:</h1>
         </div>


         <div className='flex justify-center items-center gap-3'>
          <div className='px-3 py-[1px] rounded-md border-2 border-[#aee9de] bg-[#092b35] shadow-lg'>
            <h1 className='text-lg font-semibold content-center text-white'>Development</h1>
            </div>
            <div className='px-3 py-[1px] rounded-md border-2 border-[#aee9de] bg-[#092b35] shadow-lg'>
            <h1 className='text-lg font-semibold content-center text-white'>UI/UX Design</h1>
            </div>
            <div className='px-3 py-[1px] rounded-md border-2 border-[#aee9de] bg-[#092b35] shadow-lg'>
            <h1 className='text-lg font-semibold content-center text-white'>QA Engineering</h1>
            </div>
            <div className='px-3 py-[1px] rounded-md border-2 border-[#aee9de] bg-[#092b35] shadow-lg'>
            <h1 className='text-lg font-semibold content-center text-white'>AI Learning</h1>
            </div>
         </div>
      </div>
    

      </div>

{/*  */}
      <div className='w-full flex justify-center items-center px-4 py-4'>

        <div className="grid grid-cols-3 gap-2 w-full">

         

       {blogs.map((item ,index)=>{
        return(
          <div className=" grid col-span-1 min-h-64 " key={index}>

          <div className="bg-[#A6cdc6] flex flex-col py-2 rounded-2xl px-4  justify-between w-full shadow-xl">
 
         <div className="">
         <div className="flex justify-between items-center">
          <h1 className='text-2xl font-bold text-black content-center capitalize'>{item.title}</h1>
          <h1 className='text-md font-medium text-black content-center'>{format(item.createdAt,"d-LLL")}</h1>
          </div>
          <div className=" flex gap-2 mb-4">
           <h1 className='text-md font-medium text-white content-center px-2  py-[1px] rounded-md border-2 border-[#aee9de] bg-[#092b35] shadow-lg'>{'#'}{item.tags } </h1>
          </div>
 
  <div className=" rounded-md border-[1px] border-black px-1">
 <h1 className='text-lg font-medium text-black content-center'>{item.content}</h1>
 </div>
         </div>

          <div className="flex justify-between items-center mt-4">
            
          <h1 className='text-lg font-medium text-black content-center capitalize'>{item.author.name}</h1>
 
          <div className="flex justify-center items-center gap-2">
          <AiFillLike className='text-2xl text-red-500 cursor-pointer'/>
          </div>
          </div>
          </div>
        </div>
        )
       })}
          

        </div>
      </div>
      


    </div>
  )
}

export default Home
