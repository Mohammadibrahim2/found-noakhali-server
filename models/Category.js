const mongoose=require("mongoose")

const categorySchema=mongoose.Schema({
   
   name:{
        type:String,
      
        
    },
  
    slug:{
        type:String,
        
    },

    createdAt:{
        type: Date, 
        required: true, 
        default: Date.now
    },
})

module.exports=categorySchema;