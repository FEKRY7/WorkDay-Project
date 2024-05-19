const mongoose = require('mongoose')

const {Types} = mongoose

const TokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:true
    },
    user:{
        type:Types.ObjectId,
        ref:"User"
    },
    isValied:{
        type:Boolean,
        default:true,
    }
},{timestamps:true})

const Token = mongoose.model("Token",TokenSchema)

module.exports = Token