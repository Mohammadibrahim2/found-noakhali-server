const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    teamsName: {
        type: String,

    },
    teamsNumber: {
        type: Number

    },
    categoryTeamswork:[ {
        type: String

    }],
    rescuedNumber: {
        type: Number

    },
    rescueLocation: {
        type: String

    },
    needMoreRescue: {
        type: Boolean

    },
    presentLocationRescuePeople: {
        type: String

    },
    refugeLocation: {
        type: String,

    },
    foodDonatedArea: {
        type: String,

    },
    needMoreFood: {
        type: Boolean,

    },

    medicalHelpArea: {
        type: String,

    },
    needMoreMedicalHelp: {
        type: Boolean,

    },


    donatedFamilyNumber: {
        type: Number
    },

    nextWork: [{
        type: String
     
    }],

    howManyDaysfood:{
    type:Number
    },
    createdAt:{
        type: Date, 
     
        default: Date.now
    },
    nextTargetedArea: {
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