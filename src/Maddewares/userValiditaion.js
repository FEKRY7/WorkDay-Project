const joi = require('joi')
const isValid = require('./validation.js')


const signUpValidation = joi.object({
    firstName:joi.string().required().min(2),
    lastName:joi.string().required().min(2),
    userName:joi.string().required().min(2),
    email:joi.string().email(). required(),
    recoveryMail:joi.string().email(). required(),
    password:joi.string().required().min(5),
    DOB:joi.date().required(),
    mobileNumber:joi.string().required(),
    role:joi.string()
})


const signInValiditaion = joi.object({
    email:joi.string().email(),
    mobileNumber:joi.string(),
    password:joi.string().required().min(5)
})


const updateValiditaion = joi.object({
    firstName:joi.string().min(2),
    lastName:joi.string().min(2),
    email:joi.string().email(),
    password:joi.string().min(5),
    DOB:joi.date(),
    mobileNumber:joi.string(),
    id:joi.string().custom(isValid.isValidObjectId).required()
})


const deleteValidiation = joi.object({
    id:joi.string().custom(isValid.isValidObjectId).required()

})


const getUserValidiation = joi.object({
    id:joi.string().custom(isValid.isValidObjectId).required()

})


const updatePasswordval = joi.object({
    password:joi.string().required().min(5),
    id:joi.string().custom(isValid.isValidObjectId).required()

})


const getRecoveryMailVal = joi.object({
    recoveryMail:joi.string().email(),
})


module.exports = {
    signUpValidation,
    signInValiditaion,
    updateValiditaion,
    deleteValidiation,
    getUserValidiation,
    updatePasswordval,
    getRecoveryMailVal
}