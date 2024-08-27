const express = require("express")
const app=express()
const router = express.Router()
const mongoose = require("mongoose");
const fs = require("fs");
const formidableMiddleware = require('express-formidable');
const { default: slugify } = require("slugify");
const cors=require('cors')
const categorySchema= require('../models/Category')
const teamSchema = require("../models/TeamIfno");

const { ObjectId } = require("mongodb");

const TeamIfno = new mongoose.model("Team", teamSchema );

const Category = new mongoose.model("Category", categorySchema);


app.use(cors());

//successfully done the create router:
router.post("/create-teaminfo",formidableMiddleware(), async(req, res) => {

    const { teamName,  teamMobile,  serviceNumber, categoryOfService,
        refugeLocation, areaDetails,zilla,upozila,wordNo,neededHelp,description} = req.fields;
        
    const { photo } = req.files;
   
    const teamInfo= new TeamIfno({ ...req.fields })
    if (photo) {
        teamInfo.photo.data = fs.readFileSync(photo.path)
        teamInfo.photo.contentType = photo.type
    }

await teamInfo.save() 
res.status(201).send({
    success:true,
    message:"teamInfo  added successfully ",
    teamInfo
})
if (!teamInfo)
    return res.status(400).send({
success:false,
message:"teamInfo is not created"
})
});


//get data from db :-
router.get("/get-teamsinfo", async (req, res) => {
    const teamsinfo = await TeamIfno.find().populate("teamName").select('-photo').sort("-createdAt")
    const countteamsinfo=await TeamIfno.countDocuments({})
    
        res.send({teamsinfo,countteamsinfo})
  
});
router.get("/teambycat/:id", async (req, res) => {
    try {
       const id=req.params.id
console.log(req.params.id)
        const category = await Category.findOne({ _id:new  ObjectId(id) });

        const teamsinfo = await TeamIfno.find({ teamName:category}).populate("teamName").select('-photo')

        res.send({teamsinfo })

    }

    catch (error) {
        console.log(error)
    }
})
//....
// router.get("/admin/get-product",checklogin,isAdmin,async (req, res) => {
//     const products = await Product.find().populate("category", "name").select('-photo').sort("-createdAt")
//     const countProducts=await Product.countDocuments({})
    
//         res.send({products,countProducts})
  
// });

// //getting photo:- Api is okay
router.get("/team-photo/:id", async (req, res) => {

    try {
        const teamPhoto = await TeamIfno.findById(req.params.id).select("photo")
        if (teamPhoto.photo.data) {
            res.set('Content-Type',teamPhoto.photo.contenttype)
            return res.status(201).send(teamPhoto.photo.data)
        }

    }
    catch (error) {
        res.send({
            error: error,
            message: "there is an error"
        })
    }
});

//get single team info
router.get("/get-singleteam/:id", async (req, res) => {
    try {
        const id = req.params.id
        const teamInfo = await TeamIfno.findOne({ _id: id }).select("-photo")
        res.status(200).send({
            message: "single teaminfo feched",
            success: true,
            teamInfo 
        })
        if (!teamInfo ){
           res.status(400).send({
            message:"there is a problem"
           })
        }

    }

    catch (error) {
        console.log(error)
    }
})
//search from db by key api is done:-
router.get("/search/:keyword", async (req, res) => {
    const{ keyword } = req.params
console.log(keyword)
    let data = await TeamIfno.find({
        $or: [
           
             { description: { $regex: keyword, $options: "i" } },
             { areaDetails: { $regex: keyword, $options: "i" } },
             {  categoryOfService: { $regex: keyword, $options: "i" } }
           

             
             
        ]
    }).select("-photo").sort("-createdAt")
    
    res.status(201).send({
        success:true,
       data
    })




});
// router.get("/team-filter",async(req,res)=>{
//     console.log("hfkjh")
//    await  res.send("ok")
// })
// router.post("/team-filter/:id", async (req, res) => {
//     console.log(req.params)
//     console.log("uehfhf")
//     res.send("ok")
       
    // try {

      
    //     console.log("uehfhf")
    //     res.send("fjakhf")

    //     const teamsData = await TeamIfno.find({ teamName:req.body.value}).populate("teamName")
    //     // res.status(200).send({
    //     //     success: true,
    //     //     teamsData 
    //     // })
    // }
    // catch (error) {
    //     res.send({
    //         message: "filtering error"
    //     })
    // }
// })

module.exports = router;