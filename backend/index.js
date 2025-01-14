const express = require("express");
const connectDataBase = require("./db")
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();


const app = express();

connectDataBase();


app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use("/api/users", require("./routes/userRoute"))
app.use("/api/blog", require("./routes/blogRoute"))

app.get("/",(req,res)=>{

  res.status(200).send("Helllo");
})

app.listen(3000 , ()=>{
  console.log("Server running at 3000");
})