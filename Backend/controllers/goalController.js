const asyncHandler =require('express-async-handler')
const  Goal  =require('../model/goalModel')
const  User  =require('../model/userModel')

const getGoals =asyncHandler(async(req,res)=>{
    const goals = await  Goal.find({user : req.user.id})
    res.status(200).json(goals)
})



const setGoals =asyncHandler(async(req,res)=>{
    console.log(req.body);
    if(!req.body.text){
      res.status(400)/*json({message : 'please add a text field'})*/
      throw new Error ('Please add a Text Field')
    }
     const goal = await Goal.create({
        text : req.body.text, 
        user : req.user.id
     })

    res.status(200).json(goal)
})

const updateGoals = asyncHandler(async(req,res)=>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    const user =await User.findById(req.user.id)
    //Check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //Making sure the logged in  user matches the goal user 
    if(goal.user.toString()!==user.id){
   res.status(401)
   throw new Error('User not authorized')
    }

    const updateGoals = await Goal.findById(req.params.id, req.body,{new: true})
    res.status(200).json(updateGoals)
})

const deleteGoals =asyncHandler(async(req,res)=>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    const user =await User.findById(req.user.id)
    //Check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //Making sure the logged in  user matches the goal user 
    if(goal.user.toString()!==user.id){
   res.status(401)
   throw new Error('User not authorized')
    }
    await goal.remove()

   
    res.status(200).json({id: req.params.id})
})


module.exports ={
    getGoals,setGoals,updateGoals,deleteGoals
}