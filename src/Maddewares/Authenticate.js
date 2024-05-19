const User = require('./../../Database/models/Users.js')
const Token = require('./../../Database/models/Token.js')
const jwt = require('jsonwebtoken')


const isAuthenticated = async(req,res,next)=>{
// checking token existeince
    const token = req.headers.token
    
    if(!token) 
        return res.json("token is required")
// checking token vlaidation
    const tokenDb=await Token.findOne({token , isValied:true })
    if (!tokenDb) 
        return res.json("expired Token")
    
// checkeing user vlaidateion
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY)
    
    //checking user existince
    const user = await User.findById(payload.user)
    if (!user) 
        return res.json("user not found")
     
    req.user = user 
       
    next()
    

}


module.exports = isAuthenticated