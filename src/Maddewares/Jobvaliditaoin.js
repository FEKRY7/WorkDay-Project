const joi = require('joi')
const {isValidObjectId} = require('./validation.js')


const createjobVal = joi.object({
    jobTitle:joi.string().required(),
    jobLocation:joi.string().required(),
    workingTime:joi.string().required(),
    seniorityLevel:joi.string().required(),
    jobDescription:joi.string().required(),
    technicalSkills:joi.array().items(joi.string()),
    softSkills:joi.array().items(joi.string()),
    createdBy:joi.string().custom(isValidObjectId),
    companyName:joi.string().required(),
    id:joi.string().custom(isValidObjectId)
})

const updatejobVal = joi.object({
    jobTitle:joi.string(),
    jobLocation:joi.string(),
    workingTime:joi.string(),
    seniorityLevel:joi.string(),
    jobDescription:joi.string(),
    technicalSkills:joi.array().items(joi.string()),
    softSkills:joi.array().items(joi.string()),
    createdBy:joi.string().custom(isValidObjectId),
    companyName:joi.string(),
    id:joi.string().custom(isValidObjectId)
})

const deleteJobVal = joi.object({
    companyName:joi.string(),
    id:joi.string().custom(isValidObjectId)
})


const getOneCompanyVal = joi.object({
    
    companyName:joi.string(),
})

const getFilterdJobsVal = joi.object({
    workingTime:joi.string(),
    jobLocation:joi.string(), 
    seniorityLevel :joi.string(),
    jobTitle:joi.string(),
    technicalSkills:joi.string(),
})

const applyval = joi.object({
    userTechSkills:joi.array(),
    userSoftSkills:joi.array(),
    jobId:joi.string().custom(isValidObjectId)

})

module.exports = {
    createjobVal,
    updatejobVal,
    deleteJobVal,
    getOneCompanyVal,
    getFilterdJobsVal,
    applyval
}