const express = require("express")
const router = express.Router()
const User = require("../model/user")

const registerUser = async(req,res)=>{
  const {email,name,password} = req.body;
   
    if (!name || !email || !password) {
      res.status(400).json({"message" :"All fields are required"})
      return;
    }
  
    // Check User Exsist
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({"message" :"User already exsists"})
      return;

    }
  
    // Create New User
    const newUser = await User.create({
      name,
      email,
      password,
    });
    res.status(200).json({"message": newUser});
  
}

const loginUser = async(req,res)=>{
  const {email,password} = req.body;
   
    if (!email || !password) {
      res.status(400).json({"message" :"All fields are required"})
      return;
    }
  
    // Check User Exsist
    const user = await User.findOne({ email });
    
    if (!user) {
      res.status(400).json({"message" :"User does not exsists"})
      return;
    }

    if (user.password != password) {
      res.status(400).json({"message" :"Password doesnt match"})
      return;
    }

  
    res.status(200).json({"message": user});
  
}

router.post("/register",registerUser)

router.post("/login",loginUser)

// router.get("/logout",logoutUser)

// router.get("/getuser",authMiddleware , getUser)

// router.get("/checklogin",checkLogin)

module.exports = router