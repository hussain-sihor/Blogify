const mongoose =  require("mongoose")


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
    // type:mongoose.Schema.Types.ObjectId,
    // ref: 'User',
    type:String,
    required:true,
  },
  tags:{
    type:String
  },
  likes:{
    type:[mongoose.Schema.Types.ObjectId],
    ref:'User',
    default:[]
  }
},{timestamps:true})


const Blog = mongoose.models.Blogs || mongoose.model("Blogs", BlogSchema);


module.exports = Blog;