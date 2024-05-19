const joi = require('joi')
const isValid = require('./validation.js')


const createCompanyVal = joi.object({
    companyName:joi.string(),
    description:joi.string().required(),
    industry:joi.string().required(),
    address:joi.string().required(),
    companyName:joi.string().required(),
    numberOfEmployess:joi.object({min:joi.number() , max:joi.number()}),
    companyEmail:joi.string().email().required(),
    companyHR:joi.string().custom(isValid.isValidObjectId)
})

const updatecompanyVal = joi.object({
    companyName:joi.string(),
    description:joi.string(),
    industry:joi.string(),
    address:joi.string(),
    companyName:joi.string(),
    numberOfEmployess:joi.object({min:joi.number() , max:joi.number()}),
    companyEmail:joi.string().email(),
    companyHR:joi.string().custom(isValid.isValidObjectId),
    id:joi.string().custom(isValid.isValidObjectId)
})

const deleteCompanyVal = joi.object({
    id:joi.string().custom(isValid.isValidObjectId).required()
})


const findByNameVal = joi.object({
    companyName:joi.string(),
})

const allapplications = joi.object({
    id:joi.string().custom(isValid.isValidObjectId).required()

})

module.exports = {
    createCompanyVal,
    updatecompanyVal,
    deleteCompanyVal,
    findByNameVal,
    allapplications   
}