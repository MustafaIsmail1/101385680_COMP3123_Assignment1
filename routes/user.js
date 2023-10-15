var express = require('express')
var userModel = require("../models/users")
var userRoutes = express.Router();

userRoutes.get("/", async (req,res)=>{
  try {
    const userList = await userModel.find()
    res.status(200).send(userList)
  } catch (error) { 
    res.status(404).send(error)
  }
})


//1

userRoutes.post("/signup", async (req,res) =>{
  console.log(req.body)
  try {
    const newUser = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
    await newUser.save()
    res.status(201).send("ADDED")
  } catch (error) {
    res.status(200).send(error)
  }
})


//2
userRoutes.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.findOne({ username, password });
    if (user) {
      res.status(200).send("username:"+username+",\npassword:"+password);
} else {
      res.status(401).send("status: false,\nmessage: Invalid Username and password");
    }
  } catch (error) {
    res.status(500).send(error);
  }
})





module.exports = userRoutes