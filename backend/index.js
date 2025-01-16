const express = require("express");
const connectDataBase = require("./db")
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const jwt = require("jsonwebtoken");

const app = express();

connectDataBase();
const corsOptions = {
  origin:'http://localhost:5173',
  methods:'GET,POST,HEAD,PUT,DELETE',
  credentials:true
}

app.use(express.urlencoded({extended:false}));
app.use(cors(corsOptions));
app.use(bodyParser.json());


const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(400).json({ message: "Unauthorized" });

  try {
    const verified = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = verified
    next();
  } catch {
    res.status(400).json({ message: "Invalid token" });
  }
};


app.use("/api/users", require("./routes/userRoute"))
app.use("/api/blogs", authMiddleware ,require("./routes/blogRoute"))

app.get("/",(req,res)=>{

  res.status(200).send("Helllo");
})

app.listen(3000 , ()=>{
  console.log("Server running at 3000");
})