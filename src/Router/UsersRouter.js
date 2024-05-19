const express  = require('express')
const UsersControl = require('./../Controler/UsersControl.js')
const roters = express.Router()
const isAuthenticated = require('./../Maddewares/Authenticate.js')
const {validation} = require('./../Maddewares/validation.js')
const {getUserValidiation,signInValiditaion,signUpValidation,updatePasswordval,updateValiditaion}  = require('./../Maddewares/userValiditaion.js')

// signup
roters.post('/signUp',validation(signUpValidation),UsersControl.signUp)

//signin
roters.post('/signIn',validation(signInValiditaion),UsersControl.signIn)

//update user
roters.patch('/updateUser/:id',validation(updateValiditaion),isAuthenticated,UsersControl.updateUser)

//delete user
roters.delete('/deleteUser',isAuthenticated,UsersControl.deleteUser)

// get user information
roters.get('/userData',isAuthenticated,UsersControl.userData)

//finding another user by id
roters.get('/anoterUserData/:id',validation(getUserValidiation),isAuthenticated,UsersControl.anoterUserData)

// update password
roters.patch('/upDatepassword/:id',validation(updatePasswordval),isAuthenticated,UsersControl.upDatepassword)

// forget password step 1
roters.post('/forgetPassword',UsersControl.forgetPassword)

//resrt password step 2
roters.post('/resetPassword',UsersControl.resetPassword)

module.exports = roters