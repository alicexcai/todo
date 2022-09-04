// COMMENT: this route defines the add, delete, and update methods for todos

// COMMENT: this specifies the necessary modules for the route
const router=require('express').Router()
const Todo_model=require('../models/todo')

// COMMENT: this defines the add method for todos
router.post('/add/todo',(req,res)=>{
    const {todo}=req.body;
    const {email_}=req.user.email;
    // COMMENT: this creates a new todo following the todo model schema
    const newTodo=new Todo_model({todo,email_:req.user.email,done:"0"})
    if(todo==""){
        // COMMENT: this redirects the user to the todo page if the todo is empty
        res.redirect('/')
    }
    // COMMENT: this saves the new todo to the database
    newTodo.save()
    .then(()=>{
        console.log("done")
        // COMMENT: this redirects the user to the root page
        res.redirect('/')
    })
    .catch(err=>console.log(err))

})
// COMMENT: this defines the delete method for todos
.get("/delete/todo/:_id",(req,res)=>{
    const {_id}=req.params;
    // COMMENT: this deletes the todo with the specified id
    Todo_model.deleteOne({_id})
    .then(()=>{
        console.log("deleted")
        // COMMENT: this redirects the user to the root page
        res.redirect('/')
    })
    .catch((err)=>console.log(err));
})
// COMMENT: this defines the update method for todos
.get("/update/todo/:_id",(req,res)=>{
    const {_id}=req.params;
    // COMMENT: this gets the information of the todo with the specified id
    const info=Todo_model.find();
    console.log(info)
    // COMMENT: this updates the done status of the todo with the specified id
    Todo_model.updateOne({_id}, { done:"1"})
    .then(()=>{
        console.log("deleted")
        // COMMENT: this redirects the user to the root page
        res.redirect('/')
    })
    .catch((err)=>console.log(err));
});

module.exports=router;