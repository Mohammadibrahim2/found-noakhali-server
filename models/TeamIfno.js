const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    teamName: {
        type:mongoose.ObjectId,
        ref:"Category",
        required:true

    },
   teamMobile:{
        type: Number

   },
    teamswork: {
        type: String

    },
    serviceNumber: {
        type: Number

    },
    categoryOfService: {
        type: String

    },
    refugeLocation: {
        type: String

    },
    zilla: {
        type: String

    },
    upozila: {
        type: String,

    },
    wordNo: {
        type: String,

    },
    neededHelp: {
        type: String

    },

    
    createdAt:{
        type: Date, 
     
        default: Date.now
    },
    areaDetails: {
        type: String
     
    },
    description: {
        type: String
     
    },
    photo: {
        data: Buffer,
        contentType: String

    },


})

teamSchema.virtual('id').get(function () {
    return this._id.toHexString();

});
teamSchema.set('toJSON', {
    virtuals: true
})


module.exports = teamSchema;