const Task = require('../models/Task');

//Get Task
const getTask = async(req, res)=>{
    const tasks= await Task.find({ userId: req.user.id});
    res.json(tasks);
};

//Add Task
const addTask = async(req, res)=>{
    const { title, description } = req.body;
    const task= await Task.create({userId: req.user.id, title, description});
    res.status(201).json(task);
};

//Update Task
const updateTask = async (req, res)=>{
    const task= await Task.findById(req.params.id);
    if(task.userId.toString() !== req.user.id) return res.status(401).json({ message: 'Unauthorized'});
    const updatedTask=await Task.findByIdAndUpdate(req.params.id, req.body, { new: true});
    res.json(updatedTask);
}

//Delete Task
const deleteTask= async(req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if(!task) return res.status(404).json({ message: 'Task not found' });
        
        if(task.userId.toString() !== req.user.id) {
            return res.status(401).json({message: 'Unauthorized'});
        }
        
        await Task.findByIdAndDelete(req.params.id);
        res.json({message: 'Task Removed'});
    } catch (error) {
        console.error('Delete task error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getTask, addTask, updateTask, deleteTask };