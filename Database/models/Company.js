const mongoose = require('mongoose')

const {Types} = mongoose


const CompanySchema = new mongoose.Schema({
    companyName:{ 
        type:String , 
        uniqe:true , 
        trim:true , 
        required:true 
    },
    description :{ 
        type:String  , 
        trim:true ,  
        required:true
    },
    industry :{ 
        type:String  , 
        trim:true ,  
        required:true
    },
    address :{ 
        type:String  , 
        trim:true ,  
        required:true 
    },
    numberOfEmployess:{ 
        type:Object , 
        min:{type:Number}, 
        max:{type:Number}
    },
    companyEmail:{ 
        type:String , 
        trim:true , 
        uniqe:true 
    },
    companyHR:{ 
        type:Types.ObjectId , 
        ref:"User"
    },
    
},{timestamps:true , toJSON:{virtuals:true} , toObject:{virtuals:true}})

//virtual for job field
CompanySchema.virtual("Jop",{
    ref:"Jop",
    localField:"_id",
    foreignField:"Company"
})




const Company = mongoose.model("Company", CompanySchema)

module.exports = Company
