const express = require("express")
const app=express()
const router = express.Router()
const mongoose = require("mongoose");
const fs = require("fs");
const formidableMiddleware = require('express-formidable');
const { default: slugify } = require("slugify");
const cors=require('cors')

const teamSchema = require("../models/TeamIfno");



const TeamIfno = new mongoose.model("Team", teamSchema );


app.use(cors());

//successfully done the create router:
router.post("/create-teaminfo",formidableMiddleware(), async(req, res) => {

    const { teamsName, teamsNumber,rescuedNumber,rescueLocation,needMoreRescue
        ,presentLocationRescuePeople, refugeLocation,foodDonatedArea
        , needMoreFood,medicalHelpArea,needMoreMedicalHelp,
        donatedFamilyNumber,nextWork,nextTargetedArea,
         howManyDaysfood, categoryTeamswork} = req.fields;
    const { photo } = req.files;
    // switch (true) {
    //     case !name:
    //         return res.status(500).send({ error: "name is requried" });
    //     // case !category:
    //     //     return res.status(500).send({ error: "category is requried" });
    //     // case !featuredCategory:
    //     //     return res.status(500).send({ error: "featuredCategory is requried" });
    //     // case !description:
    //     //     return res.status(500).send({ error: "description is requried" });
    //     //  case !price:
    //     //     return res.status(500).send({ error: "price is requried" });
    //     //  case !brand:
    //     //     return res.status(500).send({ error: "brand requried" });
    //      case !quantity:
    //         return res.status(500).send({ error: "quantity requried" });

    //     case photo && photo.size > 2000000:
    //         return res.status(500).send({ error: "photo is requried and should be lezz than 1mb" });

    // } 
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
    const teamsinfo = await TeamIfno.find().select('-photo').sort("-createdAt")
    const countteamsinfo=await TeamIfno.countDocuments({})
    
        res.send({teamsinfo,countteamsinfo})
  
});
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
// //search from db by key api is done:-
// router.get("/search/:keyword", async (req, res) => {
//     const{ keyword } = req.params

//     let data = await Product.find({
//         $or: [
//             { name: { $regex: keyword, $options: "i" } },
//              { description: { $regex: keyword, $options: "i" } }
//         ]
//     }).select("-photo")
    
//     res.status(201).send({
//         success:true,
//         data:data
//     })




// });
module.exports = router;