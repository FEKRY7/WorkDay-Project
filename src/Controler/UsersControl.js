const User = require('./../../Database/models/Users.js')
const Token = require('./../../Database/models/Token.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {generate} = require('generate-password')
const http = require("../folderS,F,E/S,F,E.JS");
const Responsers = require("../utilites/httperespons.js");


const signUp = async (req, res) => {
    try {
        // Check if the email or mobile number already exists
        const existingUser = await User.findOne({
            $or: [{ email: req.body.email }, { mobileNumber: req.body.mobileNumber }]
        });

        if (existingUser) {
            return Responsers.Firest(res, "This email or mobile number is already in use.", 400, http.FAIL);
        }

        // Hash the password
        const passwordHash = await bcrypt.hash(req.body.password, 8);

        // Create the user
        const user = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.firstName + " " + req.body.lastName,
            email: req.body.email,
            password: passwordHash, // Store the hashed password
            DOB: req.body.DOB,
            mobileNumber: req.body.mobileNumber,
            role: req.body.role,
            recoveryMail: req.body.recoveryMail
        });

        Responsers.Schand(res, "User created successfully. Please try to login.", 201, http.SUCCESS);
    } catch (error) {
        // Handle any errors that occur during user creation
        console.error("Error in sign up:", error);
        Responsers.Thered(res, "Failed to create user. Please try again later.", 500, http.ERROR);
    }
};


const signIn = async (req, res) => {

    const { email, mobileNumber, password } = req.body;

    try {
        let isUser;

        // Check if either email or mobile number is provided
        if (email) {
            isUser = await User.findOne({ email });
            if (!isUser) {
                return Responsers.Firest(res, "This email doesn't exist. Please sign up.", 400, http.FAIL);
            }
        } else if (mobileNumber) {
            isUser = await User.findOne({ mobileNumber });
            if (!isUser) {
                return Responsers.Firest(res, "This mobile number doesn't exist. Please sign up.", 400, http.FAIL);
            }
        } else {
            return Responsers.Firest(res, "Please provide either email or mobile number.", 400, http.FAIL);
        }

        // Validate password
        const match = await bcrypt.compare(password, isUser.password);
        if (!match) {
            return Responsers.Firest(res, "Invalid password. Please try again.", 401, http.FAIL);
        }

        // Update user status to "online"
        await User.findByIdAndUpdate(isUser._id, { status: "online" });

        // Generate JWT token
        const token = jwt.sign({ user: isUser._id }, process.env.JWT_SECRET_KEY);

        // Save token to database
        await Token.create({ token });

        // Send response
        Responsers.Schand(res, ["Congratulations! You are logged in.", {token}] , 200, http.SUCCESS);
    } catch (error) {
        console.error("Error in sign in:", error);
        Responsers.Thered(res, "An error occurred while processing your request. Please try again later.", 500, http.ERROR);
    }
};


const updateUser = async(req,res)=>{ 

try{
    if(req.body.email){
        const exist= await User.findOne({email:req.body.email})
        if(exist){
            return Responsers.Firest(res, "This mail is already used", 400, http.FAIL);
        } 
          req.user.email = req.body.email ? req.body.email : req.user.email 
      }
  
  //making sure if the user updated the phoneNumber it dosent conflict with another phoneNumber
      if(req.body.mobileNumber){
          const exist= await User.findOne({mobileNumber:req.body.mobileNumber})
        if(exist){
            return Responsers.Firest(res, "This mobileNumber is already used", 400, http.FAIL);
        } 
          req.user.email = req.body.email ? req.body.email : req.email 
      }
  
  // applying the updates 
      req.user.DOB = req.body.DOB ? req.body.DOB : req.user.DOB
      req.user.firstName = req.body.firstName ? req.body.firstName : req.user.firstName
      req.user.lastName = req.body.lastName ? req.body.lastName : req.user.lastName
  
  //saving all the updated
    req.user.save()
  
    Responsers.Schand(res, "acount updated", 200, http.SUCCESS); 
} catch (error) {
    console.error("Error updating user:", error);
    Responsers.Thered(res, "An error occurred while processing your request. Please try again later.", 500, http.ERROR);
}

}


const deleteUser = async (req, res) => {
    try {
        // Delete account by the authenticated user ID (req.user._id)
        await User.findByIdAndDelete(req.user._id);
        
        Responsers.Schand(res, "User deleted successfully.", 200, http.SUCCESS);
    } catch (error) {
        console.error("Error deleting user:", error);
        Responsers.Thered(res, "An error occurred while processing your request. Please try again later.", 500, http.ERROR);
    }
};



const userData = async(req,res)=>{
     
    try {
        // Retrieve user data from req.user
        const isUser = req.user
        
        // Send the user data in the response
        Responsers.Schand(res, isUser, 200, http.SUCCESS);

    } catch (error) {
        console.error("Error retrieving user data:", error);
        Responsers.Thered(res, "An error occurred while retrieving user data. Please try again later.", 500, http.ERROR);
    }

}


const anoterUserData = async (req, res) => {
    try {
        // Finding another user by ID
        const user = await User.findById(req.params.id);
        
        // If user is not found, return an appropriate response
        if (!user) {
            return Responsers.Firest(res, "User not found.", 404, http.FAIL);
        }

        // Send the user data in the response
        Responsers.Schand(res, user, 200, http.SUCCESS);
    } catch (error) {
        console.error("Error retrieving user data:", error);
        Responsers.Thered(res, "An error occurred while retrieving user data. Please try again later.", 500, http.ERROR);
    }
};


const upDatepassword = async(req,res,next)=>{

    try{
    // searching for the user in datebase
    const isUser = await User.findById(req.params.id)
    if(!isUser){
        return Responsers.Firest(res, "User not Found", 404, http.FAIL);
    } 
    // making suer that only the owner has the abilty to update his account
    if(req.user._id.toString() != isUser._id.toString()){
        return Responsers.Firest(res, "Not authorized User", 403, http.FAIL);
    }
    //changing the password
    isUser.password = req.body.password ? req.body.password : isUser.password
    // hashing the new password
    const hashpassword= await bcrypt.hashSync(isUser.password,8)
    isUser.password = hashpassword
    //save the change
    await isUser.save()
    
    Responsers.Schand(res, "password changed", 200, http.SUCCESS);

   }catch (error) {
    console.error("Error updating password:", error);
    Responsers.Thered(res, "An error occurred while updating the password. Please try again later.", 500, http.ERROR);
   }

}


const forgetPassword = async (req, res) => {
    try {
        // Finding the user
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return Responsers.Firest(res, "Invalid email. User not found.", 404, http.FAIL);
        }

        // Generate OTP
        let otp = generate({ length: 7, numbers: true, lowercase: true });

        // Saving the OTP in the model
        user.otp = otp;
        await user.save();

        // Send response with success message and OTP
        Responsers.Schand(res, ["Please try to reset your password.", {otp}], 200, http.SUCCESS);

    } catch (error) {
        // Handle any errors that occur
        console.error("Error in forgetPassword:", error);
        Responsers.Thered(res, "Failed to generate OTP. Please try again later.", 500, http.ERROR);
    }
};


const resetPassword = async (req,res)=>{
 try{
   //finding the uer by the uniq keys
   const isUser= await User.findOne({email:req.body.email , mobileNumber:req.body.mobileNumber})
   if(!isUser){
    return Responsers.Firest(res, "user is not found", 404, http.FAIL);
   }
   // making sure that the otp from the user matches the stored otp
   if(isUser.otp.toString() != req.body.otp){
       return Responsers.Firest(res, "invalid otp", 400, http.FAIL);
   }
   //hashing the password
   const hashed=bcrypt.hashSync(req.body.password.toString(),8)
   isUser.password = hashed
   
   await isUser.save()
   
   const upbats = await User.updateOne({email:req.body.email},{$set:{otp: Date.now()}})
   
   Responsers.Schand(res, "password reseted", 200, http.SUCCESS);
 }catch (error) {
    console.error("Error resetting password:", error);
    Responsers.Thered(res, "An error occurred while resetting the password. Please try again later.", 500, http.ERROR);
}
}


module.exports = {
    signUp,
    signIn,
    updateUser,
    deleteUser,
    userData,
    anoterUserData,
    upDatepassword,
    forgetPassword,
    resetPassword
}

