// COMMENT: This script specifies the model for the todo list

const mongoose=require('mongoose');

const Todoschema=new mongoose.Schema({
    // COMMENT: This specifies a required string input for the todo
    todo:{
        type:String,
        required:true,
    },
    email_:{
        // COMMENT: This specifies a required string input for the email
        type:String,
        required: true,
          },
    done:{
        // COMMENT: This specifies a required string input for the done status
        type:String,
        required: true,
    }

});

module.exports=new mongoose.model("Todo",Todoschema);