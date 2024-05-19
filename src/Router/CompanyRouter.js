const express  = require('express')
const CompanyControl = require('./../Controler/CompanyControl.js')
const roters = express.Router()
const isAuthenticated = require('./../Maddewares/Authenticate.js')
const isAuthorized = require('./../Maddewares/authoriztion.js')
const {validation} = require('./../Maddewares/validation.js')
const {allapplications, createCompanyVal, deleteCompanyVal, findByNameVal, updatecompanyVal} = require('./../Maddewares/CompanyValid.js')


// creating company after making suer that the user role in admin (isAuthorized("Company_HR"))
roters.post('/CreateCompany',isAuthenticated,isAuthorized("Company_HR"),validation(createCompanyVal),CompanyControl.createCompany)
 

// updating company after making suer that the user role in admin (isAuthorized("Company_HR"))
roters.patch("/updateCompant/:id",isAuthenticated,isAuthorized("Company_HR"),validation(updatecompanyVal),CompanyControl.updateCompant)


// deleteing company data
roters.delete("/deleteCompany/:id",isAuthenticated,isAuthorized("Company_HR"),validation(deleteCompanyVal),CompanyControl.deleteCompany)


// get data company 
roters.get("/companyData/:id",isAuthenticated,isAuthorized("Company_HR"),validation(deleteCompanyVal),CompanyControl.getCompanyData)


roters.post("/findByName",isAuthenticated,isAuthorized("Company_HR", "User"),validation(findByNameVal),CompanyControl.findByName)


// Get all applications for specific Jobs
roters.get("/getallTheApplications/:id",isAuthenticated,isAuthorized("Company_HR"),validation(allapplications),CompanyControl.getallTheApplications)

module.exports = roters 