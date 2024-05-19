const Company = require('./../../Database/models/Company.js')
const Application = require('./../../Database/models/Application.js')
const Jop = require('./../../Database/models/Job.js')
const http = require("../folderS,F,E/S,F,E.JS");
const Responsers = require("../utilites/httperespons.js");


// Big note iam assuming that the hr is the owner it can easly modified on the business need 
const createCompany = async(req,res)=>{
try{
    // search for company name if it was duplicated
    const companyName = await Company.findOne({companyName:req.body.companyName})
    if(companyName){
        return Responsers.Firest(res, "This companyName is already used", 400, http.FAIL);
    }  
     // search for company companyEmail if it was duplicated
    const companyEmail= await Company.findOne({companyEmail:req.body.companyEmail})
    if(companyEmail){
        return Responsers.Firest(res, "This company Email is already used", 400, http.FAIL);
    } 
    //creating company in the collection
    const company = Company.create({
        companyName:req.body.companyName,
        description:req.body.description,
        industry:req.body.industry,
        address:req.body.address,
        numberOfEmployess:{min:req.body.numberOfEmployess.min , max:req.body.numberOfEmployess.max},
        companyEmail:req.body.companyEmail,
        companyHR:req.user._id
    })
    // sending the response to user
    
     Responsers.Schand(res, "Company created", 200, http.SUCCESS);
} catch (error) {
    console.error("Error creating company:", error);
    Responsers.Thered(res, "Failed to create company", 500, http.ERROR);
}
}


const updateCompant = async(req,res)=>{
try{
    //finding the company from database
    const company= await Company.findById(req.params.id)
    if(!company){
        return Responsers.Firest(res, "company is not found", 404, http.FAIL);
    } 
    // insure that even if the user is hr he need to be the owner who created the company
    if(req.user._id.toString() != company.companyHR._id.toString()){
        return Responsers.Firest(res, "you are not the owner of the company", 403, http.FAIL);
    }
    //making shure that the company name isnt duplicated before updating
    if ( req.body.companyName){
       const companyName= await Company.findOne({companyName:req.body.companyName})
        if(companyName){
            return Responsers.Firest(res, "This companyName is already used", 400, http.FAIL); 
        } 
        company.companyName=req.body.companyName?req.body.companyName:company.companyName
    }
    //making shure that the company eamil isnt duplicated before updating
    if ( req.body.companyEmail){
        const companyEmail= await Company.findOne({companyEmail:req.body.companyEmail})
         if(companyEmail){
             return Responsers.Firest(res, "This companyEmail is already used", 400, http.FAIL);
         } 
         company.companyEmail=req.body.companyEmail?req.body.companyEmail:company.companyEmail
     }
    // update company information
    company.description=req.body.description?req.body.description:company.description
    company.industry=req.body.industry?req.body.industry:company.industry
    company.address=req.body.address?req.body.address:company.address
    company.numberOfEmployess=req.body.numberOfEmployess?req.body.numberOfEmployess:company.numberOfEmployess
    company.companyHR=req.body.companyHR?req.body.companyHR:company.companyHR
     //save the changes
    await company.save()

    Responsers.Schand(res, "update is done", 200, http.SUCCESS);
}catch (error) {
    console.error("Error updating company:", error);
    Responsers.Thered(res, "Failed to update company", 500, http.ERROR);
}
}


const deleteCompany = async(req,res)=>{
try{
        //finding the company from database
        const company= await Company.findById(req.params.id)
        if(!company){
            return Responsers.Firest(res, "company is not found", 404, http.FAIL);
        } 
        // insure that even if the user is hr he need to be the owner who created the company
        if(req.user._id.toString() != company.companyHR._id.toString()){
            return Responsers.Firest(res, "you are not the owner of the company", 403, http.FAIL);
        }
        // deleteing the data
        await company.deleteOne()
        //sending the response
        Responsers.Schand(res, "Compant deleted", 200, http.SUCCESS);
    
}catch (error) {
    console.error("Error deleting company:", error);
    Responsers.Thered(res,  "Failed to delete company", 500, http.ERROR);
}
}


const getCompanyData = async(req,res)=>{
try{
    // finding the company throught the params and using the virtuals for job
    const company= await Company.findById(req.params.id).populate('Job')
    if(!company){
        return Responsers.Firest(res, "Company is not found", 404, http.FAIL);
    }  
    // insure that even if the user is hr he need to be the owner who created the company
    if(req.user._id.toString() != company.companyHR._id.toString()){
        return Responsers.Firest(res, "you are not the owner of the company", 403, http.FAIL);
    }
    //sending the results
    Responsers.Schand(res, company, 200, http.SUCCESS);
}catch (error) {
    console.error("Error getting Company Data:", error);
    Responsers.Thered(res, "Failed to get Company Data", 500, http.ERROR);
}
}


const findByName = async (req, res) => {
    try {
        const company = await Company.findOne({ companyName: req.body.companyName });
        if (!company) {
            return Responsers.Firest(res, "There's no company with this name", 404, http.FAIL);
        }

        Responsers.Schand(res, company, 200, http.SUCCESS);
    } catch (error) {
        console.error("Error finding company by name:", error);
        Responsers.Thered(res, "Failed to find company by name", 500, http.ERROR);
    }
}

// couldnt complete it 
const getallTheApplications = async(req,res)=>{
try{
    //finding the spcific job
    const job = await Jop.findById(req.params.id)
    if(!job){
        return Responsers.Firest(res, "job is not found", 404, http.FAIL);
    } 
    //serching for the company
    const company = await Company.findById(job.company)
    if (!company){
        return Responsers.Firest(res, "company is not found", 404, http.FAIL);
    } 
    //making sure that the user  is  the owner (the hr ) 
    if(req.user._id.toString() != company.companyHR._id.toString()){
        return Responsers.Firest(res, "you are not the owner of the company", 403, http.FAIL);
    }
   
    const applictions = await Application.find({jobId:job._id})
    if(!applictions){
        return Responsers.Firest(res, "no appliction found", 404, http.FAIL);
    }  
     
   Responsers.Schand(res, applictions, 200, http.SUCCESS);

}catch (error) {
    console.error("Error getting all the applications:", error);
    Responsers.Thered(res, "Failed to get all the applications", 500, http.ERROR);
}
}

module.exports = {
    createCompany,
    updateCompant,
    deleteCompany,
    getCompanyData,
    findByName,
    getallTheApplications
}
