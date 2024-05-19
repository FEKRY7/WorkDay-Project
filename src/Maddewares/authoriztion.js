const isAuthorized = (...roles)=>{
    return (req , res , next)=>{
        if (!roles.includes(req.user.role))
        return res.json("not authorized user",{cause:403})
    

        return next()
    }
}

module.exports = isAuthorized