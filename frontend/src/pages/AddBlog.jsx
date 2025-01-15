import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Title content author likes tags

const AddBlog = () => {
  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");
	const [tags,setTags] = useState("");
  

  return (
    <div className="w-full h-screen flex justify-center items-center">
			<div className="w-[45vw] h-[65vh] flex justify-center items-center  py-5  flex-col gap-5 bg-[#dce6ee] rounded-xl shadow-[#6a6ab9] shadow-md max-sm:w-[80%] max-sm:h-[55vh] px-6">
	
				<form
					//handelSubmit funct from react-hook-form which needs userdefined function
					// onSubmit={handleSubmit}
					className="w-full flex flex-col gap-[5vh] max-sm:gap-5 justify-center max-sm:ml-4"
				>
			
					{/* Title  */}
					<div>
						<div className="flex justify-start items-start  flex-col gap-1">
              <h1 className='text-md font-medium text-black content-center'>Title : </h1>
							<input
							  value={title}
							  onChange={(e)=>{setTitle(e.target.value)}}
								type="text"
								placeholder="Title..."
								className=" p-3 w-[50%] h-[5vh] bg-transparent border-2 border-black max-sm:w-[60%] max-sm:outline-2"
							></input>
						
						</div>
					</div>


					{/* Tag  */}
					<div>
          <div className="flex justify-start items-start  flex-col gap-1">
          <h1 className='text-md font-medium text-black content-center'>Tag :</h1>
							<input
							  value={tags}
							  onChange={(e)=>{setTags(e.target.value)}}
								type="text"
								placeholder="Tags"
								className=" p-3 w-[50%] h-[5vh] bg-transparent border-2 border-black max-sm:w-[60%] max-sm:outline-2"
							></input>
			
						</div>
					</div>


					{/* Content  */}
					<div>
          <div className="flex justify-start items-start  flex-col gap-1">
            <h1 className='text-md font-medium text-black content-center'>Content : </h1>
							<textarea className="focus:outline-none bg-transparent border-2 border-black w-[80%] text-gray-900 text-lg px-2" rows={4} placeholder="Write the content"></textarea>
							
						</div>
					</div>

				

					{/* Button  */}
					<div className="flex justify-start items-start gap-3">
						<button className="px-4 py-2 w-[30%] bg-[#8585ff] text-lg text-[#131324] rounded-md font-semibold max-sm:w-[30%] max-sm:text-sm max-sm:px-0">
							Save
						</button>
					</div>
				</form>

			</div>
		</div>
  )
}

export default AddBlog
