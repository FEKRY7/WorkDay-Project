const express  = require('express')
const JopControl = require('./../Controler/JopControl.js')
const roters = express.Router()
const isAuthenticated = require('./../Maddewares/Authenticate.js')
const isAuthorized = require('./../Maddewares/authoriztion.js')
const {validation} = require('./../Maddewares/validation.js')
const {createjobVal,updatejobVal,deleteJobVal,getOneCompanyVal,getFilterdJobsVal,applyval} = require('./../Maddewares/Jobvaliditaoin.js')
const fileUpload = require('./../utilites/Multer.js')

//createing a new job 
roters.post("/createJob/:id",isAuthenticated,isAuthorized("Company_HR"),validation(createjobVal),JopControl.createJob)

// updated the job 
roters.patch("/updateJob/:id",isAuthenticated,isAuthorized("Company_HR"),validation(updatejobVal),JopControl.updateJob)

// delete the job and removing it from the array in companies
roters.delete("/deleteJob/:id",isAuthenticated,isAuthorized("Company_HR"),validation(deleteJobVal),JopControl.deleteJob)

// get all the jobs with the companies
roters.get("/getJobs",isAuthenticated,isAuthorized("Company_HR", "User"),JopControl.getAllJobs)

// get the job with company name
roters.get("/getOneJob",isAuthenticated,isAuthorized("Company_HR", "User"),validation(getOneCompanyVal),JopControl.getOneCompany)

// get filterd job
roters.get("/FilterJob",isAuthenticated,isAuthorized("Company_HR", "User"),validation(getFilterdJobsVal),JopControl.getFilterdJob)

//apply to job
roters.post("/applyToJob/:jobId",isAuthenticated,isAuthorized("Company_HR", "User"),fileUpload().single("cv"),validation(applyval),JopControl.applyToJob)


module.exports = roters