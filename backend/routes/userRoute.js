const express = require("express")
const router = express.Router()
const User = require("../model/user")
const jwt = require("jsonwebtoken")




const registerUser = async(req,res)=>{
  const {email,name,password} = req.body;
   
    if (!name || !email || !password) {
      res.status(400).json({message :"All fields are required"})
      return;
    }
  
    // Check User Exsist
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({message :"User already exsists"})
      return;

    }
  
    // Create New User
    const newUser = await User.create({
      name,
      email,
      password,
    });

   res.status(200).json({message:"User Created successfully"});
  
}

const loginUser = async(req,res)=>{
  const {email,password} = req.body;
   
    if (!email || !password) {
      res.status(400).json({message :"All fields are required"})
      return;
    }
  
    // Check User Exsist
    const user = await User.findOne({ email });
    
    if (!user) {
      res.status(400).json({message :"User does not exsists"})
      return;
    }

    if (user.password != password) {
      res.status(400).json({message :"Password doesnt match"})
      return;
    }
    const token = jwt.sign({id:user._id},process.env.JWT_TOKEN,{expiresIn:"1h"});

    res.status(200).json({token});
}

const userDetails = async(req,res)=>{
   const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(400).json({ message: "Unauthorized" });
  
    try {
      const verified = jwt.verify(token, process.env.JWT_TOKEN);
      req.user = verified
      var id = verified.id;
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch {
      res.status(400).json({ message: "Invalid token" });
    }
}

router.post("/register",registerUser)

router.post("/login",loginUser)

router.get("/user",userDetails)


module.exports = router