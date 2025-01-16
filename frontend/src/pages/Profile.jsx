import React, { useEffect, useState } from 'react'
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { format } from "date-fns";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();
  const [blogs,setBlogs]= useState([]);
  const [edit,setEdit] = useState(false);
  const [titles,setTitles] = useState("");
  const [contentss,setContentss] = useState("");
	const [tagss,setTagss] = useState("");
  // const [blogs,setBlogs]= useState([]);
  const[flag,setFlag] = useState(false);
  const[id,setId]=useState("");
  const[author,setAuthor] = useState({});

	const toastOptions = {
		position: "bottom-right",
		theme: "dark",
		pauseOnHover: false,
		draggable: true,
		autoClose: 4000,
	};
  useEffect(()=>{
    const getUser = async()=>{
         const token = localStorage.getItem("token");
    
         await axios.get("http://localhost:3000/api/users/user",{
          headers:{
            Authorization:`Bearer ${token}`
          }
        }).then(res =>{
          const id = res.data._id;
          setAuthor(res.data);
          const token = localStorage.getItem("token");
           axios.get(`http://localhost:3000/api/blogs/getblog/${id}`,{
            headers:{
              Authorization:`Bearer ${token}`
            }
          }).then(ress=>{
            setBlogs(ress.data);

          });
        });
    }
   
    getUser();
   
  },[edit])

 
  const getBlogDetails = async(id)=>{
    setTitles(id.title);
    setContentss(id.content);
    setTagss(id.tags);
    setId(id._id)
    setAuthor(id.author)
  }

	const handleSubmit = async (e) => {
		e.preventDefault();
    const token = localStorage.getItem("token");
	  const res = await axios.post(`http://localhost:3000/api/blogs/updateblog/${id}`,{title:titles,content:contentss,tags:tagss,author},{
      headers:{
        Authorization:`Bearer ${token}`
      }});

		if(res.status == 200){
      toast.success("Blog updated",toastOptions);
      setEdit(false);
		}
	};

  const deleteblog = async(id)=>{
    const res = await axios.delete(`http://localhost:3000/api/blogs/deleteblog/${id}`);
      setFlag(!flag);
  }
 

  return (
   <div className="w-full min-h-screen flex justify-start items-start bg-[#FBF5DD]">
    
       <div className='w-full flex  justify-center items-center px-4 py-4  mt-[60px]'>
           <div className="w-[60%] h-full flex flex-col justify-start items-center  gap-5 min-h-screen">
           
           {blogs && blogs.map((item)=>{
            return(
    
              <div className="bg-[#A6CDC6] flex flex-col py-2 rounded-xl px-4 h-full justify-between w-[80%] border-2 border-black shadow-xl">
     
             <div className="">
             <div className="flex justify-between items-center">
              <h1 className='text-2xl font-bold text-black content-center capitalize'>{item.title}</h1>
              
            <h1 className='text-md font-medium text-black content-center'>{format(item.createdAt,"d-LLL")}</h1>
              </div>
              <div className="overflow-hidden flex gap-2 mb-4 border-b-[1px] border-black py-1">
                <h1 className='text-sm font-medium text-black content-center'>{'#'}{item.tags } </h1>
              </div>
     
              <h1 className='text-lg font-medium text-black content-center'>{item.content}</h1>
             </div>
    
              <div className="flex justify-between items-center mt-4">
                
              <h1 className='text-sm font-medium text-black content-center capitalize'>{item.author.name}</h1>
     
              <div className="flex justify-center items-center gap-2">
              <TbEdit className='text-2xl cursor-pointer' onClick={()=>{
                setEdit(true);
                getBlogDetails(item);
              }
                }/>
              <MdDelete className='text-2xl text-red-600 cursor-pointer' onClick={()=>{
                deleteblog(item._id);
              }}/>
          
              </div>
              </div>
              </div>
         
            )
           })}
           </div>
      </div>



      {edit && <div className="w-full h-screen absolute flex justify-center items-center">
        <div className="flex h-[80%] w-[80%] bg-[#A6CDC6] justify-start items-center flex-col mt-10 rounded-md">
           <div className=" w-full flex justify-end p-4 ">
           <ImCross className='text-xl cursor-pointer' onClick={()=>{setEdit(false)}}/>
           </div>

           <form
					onSubmit={handleSubmit}
					className="w-full flex flex-col gap-10 max-sm:gap-5 justify-center max-sm:ml-4  pl-5"
				>
			
					{/* Title  */}
					<div>
						<div className="flex justify-start items-start  flex-col gap-1">
              <h1 className='text-md font-medium text-black content-center'>Title : </h1>
							<input
							  value={titles}
							  onChange={(e)=>{setTitles(e.target.value)}}
								type="text"
								placeholder="Title..."
								className=" p-3 w-[80%] h-[5vh] bg-transparent border-2 border-black max-sm:w-[60%] max-sm:outline-2 rounded-md"
							></input>
						
						</div>
					</div>


					{/* Tag  */}
					<div>
          <div className="flex justify-start items-start  flex-col gap-1">
          <h1 className='text-md font-medium text-black content-center'>Tag :</h1>
							<input
							  value={tagss}
							  onChange={(e)=>{setTagss(e.target.value)}}
								type="text"
								placeholder="Tags"
								className=" p-3 w-[80%] h-[5vh] bg-transparent border-2 border-black max-sm:w-[60%] max-sm:outline-2 rounded-md"
							></input>
			
						</div>
					</div>


					{/* Content  */}
					<div>
          <div className="flex justify-start items-start  flex-col gap-1">
            <h1 className='text-md font-medium text-black content-center'>Content : </h1>
							<textarea className="focus:outline-none bg-transparent border-2 border-black w-[80%] text-gray-900 text-lg px-2 rounded-md" value={contentss}
							  onChange={(e)=>{setContentss(e.target.value)}} rows={4} placeholder="Write the content"></textarea>
							
						</div>
					</div>

				

					{/* Button  */}
					<div className="flex justify-start items-start gap-3">
						<button className="px-4 py-2 w-[25%] bg-[#16404D] text-lg text-white rounded-md font-semibold max-sm:w-[30%] max-sm:text-sm max-sm:px-0">
							Save
						</button>
					</div>
				   </form>

           
        </div>
      </div>}
   </div>
  )
}

export default Profile






// const blog=[{title:"AI gaining trust",content:"so a reasearch has happened and it was foud that a aii are learning at exponential rate so a reasearch has happened and it was foud that a aii are learning at exponential rate so a reasearch has happened and it was foud that a aii are learning at exponential rate",date:"21 june",author:"hussain",tags:["entertainment","happyLife","technology"],likes:21},
// {title:"AI gaining trust",content:"so a reasearch has happened and it was foud that a aii are learning at exponential rate",date:"21 june",author:"hussain",tags:["entertainment","happyLife","technology"],likes:21},{title:"AI gaining trust",content:"so a reasearch has happened and it was foud that a aii are learning at exponential rate",date:"21 june",author:"hussain",tags:["entertainment","happyLife","technology"],likes:21},{title:"AI gaining trust",content:"so a reasearch has happened and it was foud that a aii are learning at exponential rate",date:"21 june",author:"hussain",tags:["entertainment","happyLife","technology"],likes:21},{title:"AI gaining trust",content:"so a reasearch has happened and it was foud that a aii are learning at exponential rate",date:"21 june",author:"hussain",tags:["entertainment","happyLife","technology"],likes:21},]