const router = require('express').Router()
// COMMENT: import the todo model
const Todo_model=require('../models/todo');
// COMMENT: import the ensureAuth and ensureGuest middleware
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// COMMENT: specify which page to render when the user visits the root page
router.get('/', ensureGuest ,(req, res) => {
    res.render('login')
  })

  // COMMENT: specify which page to render when the user visits the /log page
router.get("/log",ensureAuth, async(req,res)=>{
    // const alldata =await Todo_model.find();
    const user=await Todo_model.find({email_:req.user.email});
    res.render('index',{todo:user,userinfo:req.user})
})
module.exports=router;