const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    firstName:{ 
        type: String, 
        trim:true, 
        required:true 
    },
    lastName:{
        type: String ,
         trim:true , 
         required:true 
    },
    userName:{ 
        type: String ,
        trim:true  
    },
    email:{ 
        type:String , 
        trim: true , 
        required:true ,
        uniqe:true 
    },
    password:{ 
        type:String, 
        required:true , 
        min:5 
    },
    recoveryMail:{ 
        type:String , 
        trim: true ,
        uniqe:true 
    },
    DOB:{ 
        type:Date , 
        required:true
    }, 
    mobileNumber:{ 
        type:String , 
        required:true , 
        uniqe:true
    },
    role:{ 
        type:String,
        enum:["User" ,"Company_HR"], 
        default:"User"
    },
    status:{ 
        type:String , 
        enum:["online", 'offline'], 
        default:"offline"
    },
    otp:{ 
        type:String, 
        length:7,
    }
},{timestamps:true})

const User = mongoose.model('User',UserSchema)

module.exports = User