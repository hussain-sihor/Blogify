const mongoose = require("mongoose")

const connectDB = async()=>{
  console.log("inside db");
  try{
    // console.log(process.env.MONGO_URI);
    const connect = mongoose.connect(process.env.MONGO_URI).then(()=>{
      console.log("DB Connected")
    }
    )
  }catch(error){
    console.log(error);
  }
 
}

module.exports = connectDB;