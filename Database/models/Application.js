const mongoose = require('mongoose')

const {Types} = mongoose


const ApplicationSchema = new mongoose.Schema({

    jobId:{ 
        type:Types.ObjectId,
         ref:"Job"
    },
    userId:{ 
        type:Types.ObjectId, 
        ref:"User"
    },
    userTechSkills:[{type:String}],
    userSoftSkills:[{type:String}],
    userResume:{
        id:{type:String},
        url:{type:String}
    }
},{timestamps:true})



const Application = mongoose.model("Application", ApplicationSchema)

 module.exports = Application