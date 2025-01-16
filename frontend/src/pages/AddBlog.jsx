import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Title content author likes tags

const AddBlog = () => {

	const navigate = useNavigate();
  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");
	const [tags,setTags] = useState("");
  const[author,setAuthor]= useState({});

  const [user,setUser]= useState({});

  useEffect(()=>{
   
    const getUser = async()=>{
         const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/users/user",{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
      if(res.status == 200){
        const userData = res.data;
        setUser(userData);
				setAuthor(userData);
      }
    }
    getUser();
 
  },[])

	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem("token");
	  const res = await axios.post("http://localhost:3000/api/blogs/createblog",{title,content,tags,author},{
			headers:{
				Authorization:`Bearer ${token}`
			}
		} )

		if(res.status == 200){
			navigate("/")
		}
	};
  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#FBF5DD]">
			<div className="w-[45vw] h-[68vh] flex justify-center items-center  py-5  flex-col gap-5 bg-[#A6CDC6] rounded-xl shadow-[#16404D] shadow-md max-sm:w-[80%] max-sm:h-[55vh] px-6">
	
				<form
					//handelSubmit funct from react-hook-form which needs userdefined function
					onSubmit={handleSubmit}
					className="w-full flex flex-col gap-[5vh] max-sm:gap-5 justify-center max-sm:ml-4"
				>
			
					{/* Title  */}
					<div>
						<div className="flex justify-start items-start  flex-col gap-1">
              <h1 className='text-lg font-medium text-black content-center'>Title : </h1>
							<input
							  value={title}
							  onChange={(e)=>{setTitle(e.target.value)}}
								type="text"
								placeholder="Enter your title"
								className=" py-5 px-2 w-[80%] h-[5vh] bg-transparent border-2 border-black rounded-md text-xl flex justify-center shadow-md"
							></input>
						
						</div>
					</div>


					{/* Tag  */}
					<div>
          <div className="flex justify-start items-start  flex-col gap-1">
          <h1 className='text-lg font-medium text-black content-center'>Tag :</h1>
							<input
							  value={tags}
							  onChange={(e)=>{setTags(e.target.value)}}
								type="text"
								placeholder="Enter a tag"
								className="py-5 px-2 w-[80%] h-[5vh] bg-transparent border-2 border-black rounded-md text-xl flex justify-center shadow-md"
							></input>
			
						</div>
					</div>


					{/* Content  */}
					<div>
          <div className="flex justify-start items-start  flex-col gap-1">
            <h1 className='text-lg font-medium text-black content-center'>Content : </h1>
							<textarea className="focus:outline-none bg-transparent border-2 border-black w-[80%] text-gray-900 text-xl px-2 rounded-md shadow-md" value={content}
							  onChange={(e)=>{setContent(e.target.value)}} rows={4} placeholder="Write your content"></textarea>
							
						</div>
					</div>

				

					{/* Button  */}
					<div className="flex justify-start items-start gap-3">
						<button className="px-4 py-2 w-[30%] bg-[#16404D] text-lg text-white rounded-md font-semibold " type="submit">
							Create
						</button>
					</div>
				</form>

			</div>
		</div>
  )
}

export default AddBlog
