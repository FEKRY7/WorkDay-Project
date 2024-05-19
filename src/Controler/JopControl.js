const Company = require('./../../Database/models/Company.js')
const Application = require('./../../Database/models/Application.js')
const Jop = require('./../../Database/models/Job.js')
const cloudinary = require('./../utilites/Cloud.js')
const http = require("../folderS,F,E/S,F,E.JS");
const Responsers = require("../utilites/httperespons.js");


const createJob = async(req,res)=>{
try{
  const CompanyFound= await Company.findById(req.params.id)
  if(!CompanyFound){
    return Responsers.Firest(res, "Company is not found", 404, http.FAIL);
  } 
  const dublicatedJob= await Jop.findOne({jobTitle:req.body.jobTitle , company:req.params.id })
  if(dublicatedJob){
    return Responsers.Firest(res, "the job is already existed", 400, http.FAIL);
  } 
  //create job
  const jobs= await Jop.create({
      jobTitle:req.body.jobTitle,
      jobLocation:req.body.jobLocation,
      // i think workingtime need to be enum because the choicess is known 
      workingTime:req.body.workingTime,
      seniorityLevel:req.body.seniorityLevel,
      jobDescription:req.body.jobDescription,
      technicalSkills:req.body.technicalSkills,
      softSkills:req.body.softSkills,
      createdBy:req.user._id,
      company:req.params.id
  })
  // //pushing job in jobs array and making sure the compant existed
  // const company = await companyModel.findOneAndUpdate({companyName:req.body.companyName},{$push:{jobs:jobs.id}})
  // if(!company)return next(new Error("company is not found"))
   
    Responsers.Schand(res, "job created", 200, http.SUCCESS);

}catch (error) {
  console.error("Error creating job:", error);
  Responsers.Thered(res, "Failed to create job", 500, http.ERROR);
}
}


const updateJob = async (req, res) => {
  try {
    // Find the job that needs to be updated
    const job = await Jop.findById(req.params.id);
    
    // If job is not found, return a response
    if (!job) {
      return Responsers.Firest(res, "Job not found", 404, http.FAIL);
    }

    // Making the updates
    job.jobTitle = req.body.jobTitle ? req.body.jobTitle : job.jobTitle;
    job.jobLocation = req.body.jobLocation ? req.body.jobLocation : job.jobLocation;
    job.workingTime = req.body.workingTime ? req.body.workingTime : job.workingTime;
    job.seniorityLevel = req.body.seniorityLevel ? req.body.seniorityLevel : job.seniorityLevel;
    job.jobDescription = req.body.jobDescription ? req.body.jobDescription : job.jobDescription;
    job.technicalSkills = req.body.technicalSkills ? req.body.technicalSkills : job.technicalSkills;
    job.softSkills = req.body.softSkills ? req.body.softSkills : job.softSkills;

    // Save the changes
    await job.save();

    // Sending the response to user
    Responsers.Schand(res, "Job updated", 200, http.SUCCESS);
  }catch (error) {
    // If any error occurs, return an error response
    console.error("Error updating job:", error);
    Responsers.Thered(res, "Internal Server Error", 500, http.ERROR);
  }
};


const deleteJob = async(req,res)=>{
try{
  //checking the job existince
  const job = await Jop.findById(req.params.id)
  if(!job){
    return Responsers.Firest(res, "job is not found", 404, http.FAIL);
  }
  // checking tht owner 
  if(job.createdBy.toString() !== req.user._id.toString()){
    return Responsers.Firest(res, "not authorized user", 403, http.FAIL); 
  }
  //deleting the job
  await job.deleteOne()

  Responsers.Schand(res, "job deleted", 200, http.SUCCESS);

}catch (error) {
    // If any error occurs, return an error response
    console.error("Error deleteing job:", error);
    Responsers.Thered(res, "Internal Server Error", 500, http.ERROR);
}

}


const getAllJobs = async(req,res)=>{
try{
  const jobs = await Jop.find().populate("company")
  if(!jobs){
    return Responsers.Firest(res, "no jobs avilable", 404, http.FAIL);
  } 

  Responsers.Schand(res, jobs, 200, http.SUCCESS);

}catch (error) {
  // If any error occurs, return an error response
  console.error("Error fetching jobs:", error);
  Responsers.Thered(res, "Failed to fetch jobs", 500, http.ERROR);
}
}


const getSpecificCompany = async(req,res)=>{
    
try{
  // find all the jobs with and getting there companies
  const jobs = await Jop.find().populate("company")
  if(!jobs){
    return Responsers.Firest(res, "No jobs avilable", 404, http.FAIL);
  } 
// sending the response
Responsers.Schand(res, jobs, 200, http.SUCCESS);
}catch (error) {
  // If any error occurs, return an error response
  console.error("Error fetching jobs for specific company:", error);
  Responsers.Thered(res, "Failed to fetch jobs for specific company", 500, http.ERROR);
}
  
}


const getOneCompany = async (req, res) => {
  try {
    // Destructure the query
    const { companyName } = req.query;

    // Search in the company model to find the company with the name
    const company = await Company.findOne({ companyName });

    // If company is not found, return a response
    if (!company) {
      return Responsers.Firest(res, "Company not found", 404, http.FAIL);
    }

    // Searching in jobs model with company id
    const jobs = await Jop.find({ company: company._id });

    // If no jobs are found, return a response
    if (!jobs || jobs.length === 0) {
      return Responsers.Firest(res, "No jobs in this company", 200, http.FAIL);
    }

    // Sending the response with the found jobs
    Responsers.Schand(res, jobs, 200, http.SUCCESS);
  }catch (error) {
    // If any error occurs, return an error response
    console.error("Error retrieving company data:", error);
    Responsers.Thered(res, "Internal Server Error", 500, http.ERROR);
}
};


const getFilterdJob = async(req,res)=>{
 
try{
  const { sort , page , keyword}= req.query
  
  const jobs = await Jop.find({...req.query}).sort(sort).paginate(page).search(keyword);
  if (!jobs) {
    return Responsers.Firest(res, "No jobs found", 404, http.FAIL);
  }

  Responsers.Schand(res, jobs, 200, http.SUCCESS);
}catch (error) {
  // If any error occurs, return an error response
  console.error("Error retrieving filtered jobs:", error);
  Responsers.Thered(res, "Internal Server Error", 500, http.ERROR);
}

}


const applyToJob = async (req, res, next) => {
  try {
      // Check if the file was uploaded
      if (!req.file){
        return Responsers.Firest(res, "Please upload your CV", 400, http.FAIL);
      } 
    
      // Upload the CV to Cloudinary
      const { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.CLOUD_FOLDER_NAME}/Cvs` });

      // Check if the user has already applied for the job
      const appliedBefore = await Application.findOne({ jobId: req.params.jobId, userId: req.user._id });
      if (appliedBefore){
        return Responsers.Firest(res, "You can't apply more than once for the same job", 400, http.FAIL);
      } 

      // Create the application
      const application = await Application.create({
          jobId: req.params.jobId,
          userId: req.user._id,
          userTechSkills: req.body.userTechSkills,
          userSoftSkills: req.body.userSoftSkills,
          userResume: {
              id: public_id,
              url: secure_url
          }
      });

      // Sending the response
      Responsers.Schand(res, "Application created", 200, http.SUCCESS);

  } catch (error) {
      console.error("Error applying to job:", error);
      Responsers.Thered(res, "An error occurred while processing your request", 500, http.ERROR);
  }
};


module.exports = {
  createJob ,
  updateJob,
  deleteJob,
  getAllJobs,
  getSpecificCompany,
  getOneCompany,
  getFilterdJob,
  applyToJob
}