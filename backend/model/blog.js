const mongoose =  require("mongoose")
const User = require("../model/user");

const BlogSchema = new mongoose.Schema({

  title:{
    type:String,
    required:true,
  },
  content:{
    type:String,
    required:true,
  },
  author:{
     type: mongoose.Schema.Types.ObjectId, ref: "User" 
  },
  tags:{
    type:String
  },
 
},{timestamps:true})


const Blog = mongoose.models.Blogs || mongoose.model("Blogs", BlogSchema);


module.exports = Blog;