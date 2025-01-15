import React, { useEffect, useState } from 'react'
import bg from '../assets/bg.png'
import { AiFillLike } from "react-icons/ai";
import axios from 'axios';
import { compareAsc, format } from "date-fns";

const Home = () => {
  // const blogs=[{title:"AI gaining trust",content:"so a reasearch has happened and it was foud that a aii are learning at exponential rate so a reasearch has happened and it was foud that a aii are learning at exponential rate so a reasearch has happened and it was foud that a aii are learning at exponential rate",date:"21 june",author:"hussain",tags:["entertainment","happyLife","technology"],likes:21},
  // {title:"AI gaining trust",content:"so a reasearch has happened and it was foud that a aii are learning at exponential rate",date:"21 june",author:"hussain",tags:["entertainment","happyLife","technology"],likes:21},{title:"AI gaining trust",content:"so a reasearch has happened and it was foud that a aii are learning at exponential rate",date:"21 june",author:"hussain",tags:["entertainment","happyLife","technology"],likes:21},{title:"AI gaining trust",content:"so a reasearch has happened and it was foud that a aii are learning at exponential rate",date:"21 june",author:"hussain",tags:["entertainment","happyLife","technology"],likes:21},{title:"AI gaining trust",content:"so a reasearch has happened and it was foud that a aii are learning at exponential rate",date:"21 june",author:"hussain",tags:["entertainment","happyLife","technology"],likes:21},]

  const [blogs,setBlogs]= useState([]);

  useEffect(()=>{
    const getBlogs = async()=>{
      const res = await axios.get("http://localhost:3000/api/blogs/getblogs");
      console.log(res);

      if(res.status == 200){
        const blogList = res.data.message;
        setBlogs(blogList);
      }
    }
    getBlogs();
  },[])
  return (
    <div className='w-full h-screen bg-[#FBF5DD] flex justify-start items-center flex-col'>
      <div className='w-full bg-green-300 flex  items-center mt-[60px] py-10'>

      <div className='w-[50%]  flex justify-start items-center h-full pl-20'>

       <div className='w-[80%] h-[70%] flex justify-center items-start flex-col gap-2'>
       <h1 className='text-3xl font-bold text-black content-center'>Discover stories, ideas, and insights.</h1>
       <h1 className='text-md font-normal text-black content-center'>Blogify is your gateway to expressing, discovering, <br></br> and sharing ideas with the world.</h1>
       <button className="mt-5 px-12 py-2  bg-[#16404D] text-md text-[#FBF5DD] rounded-md font-medium max-sm:w-[30%] max-sm:text-sm max-sm:px-0">
							Create blog
						</button>
       </div>
      </div>

      <div className='w-[50%]  flex justify-start items-center'>

       <div className='w-full h-[70%] flex justify-center items-start flex-col pl-20'>
     <img src={bg} alt="" className='w-[400px] h-64 rounded-md'/>
       </div>
      </div>
      </div>


      <div className='w-full bg-purple-300 flex justify-start items-center py-10'>

      <div className='w-[70%]  flex justify-start items-center h-full pl-16 gap-10'>
         <div>
          <h1 className='text-xl font-bold text-black content-center'>Blog Ides: </h1>
         </div>

         <div className='flex justify-center items-center gap-3'>
          <div className='px-3 py-[1px] rounded-md border-2 border-black'>
            <h1 className='text-lg font-semibold text-black content-center'>Development</h1>
            </div>
          <div className='px-3 py-[1px] rounded-md border-2 border-black'>
            <h1 className='text-lg font-semibold text-black content-center'>UI/UX Design</h1>
            </div>
          <div className='px-3 py-[1px] rounded-md border-2 border-black'>
            <h1 className='text-lg font-semibold text-black content-center'>QA Engineering</h1>
            </div>
         </div>
      </div>
    

      </div>


      <div className='w-full flex justify-center items-center px-4 py-4 bg-yellow-100'>
        <div className="grid grid-cols-3 gap-2 w-full bg-yellow-400">

         

       {blogs.map((item)=>{
        return(
          <div className=" grid col-span-1 justify-center items-start">

          <div className="bg-orange-200 flex flex-col py-2 rounded-xl px-4 h-full justify-between w-full">
 
         <div className="">
         <div className="flex justify-between items-center">
          <h1 className='text-2xl font-bold text-black content-center'>{item.title}</h1>
          <h1 className='text-md font-medium text-black content-center'>{format(item.createdAt,"d-LLL")}</h1>
          </div>
          <div className="overflow-hidden flex gap-2 mb-4">
            {item.tags.map(item=> <h1 className='text-sm font-medium text-black content-center'>{'#'}{item } </h1>)}
          </div>
 
          <h1 className='text-lg font-medium text-black content-center'>{item.content}</h1>
         </div>

          <div className="flex justify-between items-center mt-4">
            
          <h1 className='text-lg font-medium text-black content-center capitalize'>{item.author}</h1>
 
          <div className="flex justify-center items-center gap-2">
          <AiFillLike className='text-2xl'/>
          <h1>{item.likes.length}</h1>
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
