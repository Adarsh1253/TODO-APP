const express = require("express");
const Task = require("../models/Tasks.js");
const auth = require("../middleware/auth.js");

const router = express.Router({mergeParams:true});

//get all task
router.get("/",auth, async(req,res)=>{
    try{
        const tasks = await Task.find();
        res.status(200).json(tasks);
    }catch(err){
        res.status(500).json({error:err.message});
    }
});

//post new tasks
router.post("/", async(req , res)=>{
    console.log(req.body);
    try{
        const newTask = new Task(req.body);
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    }catch(err){
        res.status(400).json({error:err.message});
    }
});

//update task
router.put("/:id", async(req,res)=>{
    try{
        const updateTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        res.status(200).json(updateTask);
    }catch(err){
        res.status(404).json({error:err.message});
    }
});


//delete a task
router.delete("/:id", async(req,res)=>{
    try{
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message:"Task deleted successfully"
        });
    }catch(err){
        res.status(404).json({error:err.message});
    }
});

module.exports= router;