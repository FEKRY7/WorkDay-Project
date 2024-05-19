const mongoose = require('mongoose')

const {Types} = mongoose

const JopSchema = new mongoose.Schema({
    jobTitle:{ 
        type:String, 
        required:true , 
        trim:true
    },
    jobLocation:{ 
        type:String, 
        required:true , 
        trim:true
    },
    workingTime:{ 
        type:String, 
        required:true , 
        trim:true
    },
    seniorityLevel:{ 
        type:String, 
        enum:["Junior","Mid-Level","Senior","Team-Lead"," CTO"]
    },
    jobDescription:{ 
        type:String , 
        required:true , 
        trim:true
    },
    technicalSkills:[{type:String}],
    softSkills:[{type:String}],
    createdBy:{ 
        type:Types.ObjectId , 
        ref:"User"
    },
    company:{ 
        type:Types.ObjectId , 
        ref:"Company"
    },
    
},{timestamps:true , toJSON:{virtuals:true} , toObject:{virtuals:true} , strictQuery:true })



JopSchema.query.paginate = function (page) {
    page = page <1 || isNaN(page) || !page ? 1:page
    const limit = 2
    const skip = limit * (page-1)
    return this.skip(skip).limit(limit)
}

JopSchema.query.search= function(keyword){
    if(keyword){
        return this.find({name:{$regex :keyword , $options:"i"}})
    }
    return this

}

const Jop = mongoose.model("Jop", JopSchema)

module.exports = Jop