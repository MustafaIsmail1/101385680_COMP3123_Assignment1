var express = require('express');
const empModel = require('../models/employees');
var employeeRoutes = express.Router();


//3

employeeRoutes.get("/", async (req,res)=>{
  try {
    const empList = await empModel.find()
    res.status(200).send(empList)
  } catch (error) { 
    res.status(404).send(error)
  }
})


//4

employeeRoutes.post("/employees", async (req,res)=>{
  console.log(req.body)
  try {
    const newEmp = new empModel({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      gender: req.body.gender,
      salary: req.body.salary
    })
    await newEmp.save()
    res.status(201).send("ADDED")
  } catch (error) {
    res.status(200).send(error)
  }
})


//5

employeeRoutes.get("/employees/:eid", async (req, res) => {
  try {
    const employee = await empModel.findById(req.params.eid);
    if (!employee) {
      res.status(404).send("Employee not found");
    } else {
      res.status(200).send(employee);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});


//6

employeeRoutes.put("/employees/:eid", async (req,res)=>{
  try {
    const updatedEmployee = await empModel.findByIdAndUpdate(
      req.params.eid,
      {
        $set: {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          gender: req.body.gender,
          salary: req.body.salary,
        },
      },
      { new: true }
    );
    if (!updatedEmployee) {
      res.status(404).send("Cannot find employee");
    } else {
      res.status(200).send("Employee Updatred");
    }
  } catch (error) {
    res.status(500).send(error);
  }
})


//7

employeeRoutes.delete("/employees?:eid=xxx", async (req, res) => {
  try {
    const deletedEmployee = await empModel.findByIdAndRemove(req.params.eid);
    if (!deletedEmployee) {
      res.status(404).send("Employee not found");
    } else {
      res.status(204).send("Employee details deleted");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});





module.exports = employeeRoutes