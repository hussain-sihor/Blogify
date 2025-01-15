import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"

const LoginForm = () => {

	const navigate = useNavigate();


	const [email,setEmail] = useState("");
	const [password,setPassword] = useState("");


	const handleSubmit = async (e) => {
		e.preventDefault();
		try{
		const res = await axios.post("http://localhost:3000/api/users/login",{email:email,password:password} )
		console.log("resppo",res)
		if(res.status == 200){
			navigate('/')
		}
		}catch(err){
      console.log(err.response.data.message);
		}
		
		
	};
	return (
		<div className="w-full h-screen flex justify-center items-center bg-[#FBF5DD]">
			
      <div className=" mt-5 w-[45vw] h-[80%] flex justify-start items-center  flex-col gap-10 bg-[#A6CDC6] rounded-xl shadow-[#6a6ab9] shadow-md max-sm:w-[80%] max-sm:h-[55vh] pt-10">
	      
        <div className="w-full flex flex-col gap-4 justify-center items-center pt-2 pb-2">
        <img src={logo} alt="" className='w-[78px] text-white'/>
        <h1 className='text-4xl font-bold content-center text-[#16404D]'>Welcome Back !</h1>
        </div>

				<form
					//handelSubmit funct from react-hook-form which needs userdefined function
					onSubmit={handleSubmit}
					className="w-full flex flex-col gap-[5vh] max-sm:gap-5 justify-center max-sm:ml-4 items-center"
				>
			
					{/* Email  */}

						<div className="flex justify-between items-center gap-3 border-b-2 border-black w-[60%] pl-2 pr-4">
							<input
							  value={email}
							  onChange={(e)=>{setEmail(e.target.value)}}
								type="email"
								placeholder="Enter email"
								className=" p-3 w-[70%] h-[5vh] bg-transparent max-sm:w-[60%] focus:outline-none"
							></input>
							<MdEmail className="text-lg max-sm:text-sm" />
						</div>

			
					{/* Password  */}
					
						<div className="flex justify-between items-center gap-3 border-b-2 border-black w-[60%] pl-2 pr-4">
							<input
							value={password}
							onChange={(e)=>{setPassword(e.target.value)}}
								type="password"
								placeholder="Enter password"
								className=" p-3 w-[70%] h-[5vh] bg-transparent max-sm:w-[60%] focus:outline-none"
							></input>
							<RiLockPasswordFill className="text-lg max-sm:text-sm" />
						</div>
					

					{/* Button  */}
					<div className="flex justify-center items-center gap-3">
						<button className="px-12 py-2 w-full bg-[#16404D] text-lg text-[#FBF5DD] rounded-md font-semibold max-sm:w-[30%] max-sm:text-sm max-sm:px-0">
							Sign In
						</button>
					</div>
				</form>


					{/* Navigate links */}
				<div>
						<a href="/register">
							Don't have an account?{" "}
							<span className="text-[#16404D] font-bold max-sm:text-sm flex-wrap">
								Register Here
							</span>
						</a>
				
					
					
				</div>

			</div>
		</div>
	);
};

export default LoginForm;