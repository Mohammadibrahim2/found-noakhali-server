const mongoose = require('mongoose');

const userSchema= mongoose.Schema({
    name:{
        type:String,
        
    },
  
    email:{
        type:String,
        required:true
      
    },
   
    passwordHash:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
  
    createdAt:{
        type: Date, 
        required: true, 
        default: Date.now
    },
    phone:{
        type:Number
    },
   

   
})
module.exports=userSchema