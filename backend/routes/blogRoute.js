const express = require("express")
const router = express.Router()
const Blog = require("../model/blog")

const createBlog = async(req,res) => {
   const{title,content,author,tags,likes} = req.body;

   if (!title || !content || !author || !tags || !likes) {
      res.status(400).json({"message" :"All fields are required"})
      return;
    }

  
    // Create New Blog
    const newBlog = await Blog.create({
      title,
      content,
      author,
      tags,
      likes
    });
    res.status(200).json({"message": newBlog});
}


const deleteBlog = async(req,res) => {
   var id = req.params.id;

   const deleted = await Blog.findByIdAndDelete(id);
    
    res.status(200).json({"message": deleted});
}


const getBlogs = async(req,res) =>{
   
  const blogs = await Blog.find();

  res.status(200).json({"message":blogs});
}


const getUserBlogs = async(req,res) =>{
   const {id} = req.body;
  const blogs = await Blog.find({author:id});

  res.status(200).json({"message":blogs});
}


const updateBlog = async(req,res) => {
   var id = req.params.id;

   const{title,content,author,tags,likes} = req.body;

   if (!title || !content || !author || !tags || !likes) {
      res.status(400).json({"message" :"All fields are required"})
      return;
    }

  
    // Update Blog
    await Blog.findByIdAndUpdate(
     id,
      {
      title,
      content,
      author,
      tags,
      likes
    });

    const updatedBlog = await Blog.findById(id);
    
    res.status(200).json({"message": updatedBlog});
}


const updateLikes = async(req,res) => {
  var id = req.params.id;

  const{likes} = req.body;

  if (!likes) {
     res.status(400).json({"message" :"All fields are required"})
     return;
   }

 
   // Update Likes
   const blog = await Blog.findById(id);
   blog.likes = likes;

    await Blog.findByIdAndUpdate(
    id,blog);
   
    const updatedblog = await Blog.findById(id);  

   res.status(200).json({"message": updatedblog});
}



router.post("/createblog",createBlog)

router.delete("/deleteblog/:id",deleteBlog)

router.post("/updateblog/:id",updateBlog)

router.get("/getblogs",getBlogs);

router.get("/getuserblogs",getUserBlogs);

router.post("/updatelikes/:id",updateLikes)
// router.get("/logout",logoutUser)

// router.get("/getuser",authMiddleware , getUser)

// router.get("/checklogin",checkLogin)

module.exports = router