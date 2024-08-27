const express=require("express")
const dotenv =require("dotenv")
const cors=require('cors')
const mongoose = require('mongoose');
const port= 5550
const app=express()

// mohammadibrahim6454

// pass:spnVCMwDVTvJtzX4

 app.use(cors())
dotenv.config()
app.use(express.json())

const teamInfoRouter=require("./routes/teamInforouter")
const categoryRouter=require("./routes/teamcategoryrouter");
const userRouter=require("./routes/userruter");
//connection withe db:-

const uri ="mongodb+srv://mohammadibrahim6454:spnVCMwDVTvJtzX4@cluster0.mccfu.mongodb.net/"



 
mongoose.set("strictQuery", true);
mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
  .then(() => console.log('connection sucessful'))
  .catch((err)=>console.log(err));

//connection withe db:---------------

async function run(){
    
        try{ 
// start charity-app:


app.use("/team",teamInfoRouter);
app.use("/category",categoryRouter);
app.use("/user",userRouter);


}
      finally{

      } 

}
run().catch(console.dir)


const errorHandler =(err,req,res,next)=>{
    if(res.headersSent){
        return next(err);
    }
    res.status(401).json({
        error:err
    })
}

app.use(errorHandler)



app.listen(port,()=>{
    console.log(port,"port")

});