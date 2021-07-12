import Job from '../models/jobs.js';
import { ApiError } from "../middlewares/apiError.js";

export const getJobs = async (req, res, next) => {
    let jobs = [];
    jobs = await Job.find({});
    res.status(200).json(jobs);
}

export const getJob = async (req, res, next) => {
    const { id } = req.params;

    let job = await Job.findById({ _id: id });
    if (!job) {
        next(ApiError.badRequest("Couldn't find any job with the entered _id"));
        return;
    }

    res.status(200).json(job);
}

export const createJob = async (req, res, next) => {
    const {
        jobTitle,
        jobType,
        jobDepartment,
        jobMinXP,
        jobMaxXP,
        jobMinSalary,
        jobMaxSalary,
        jobDescription,
        jobResponsibilities,
        jobQualifications
    } = req.body;

    try {
        const newJob = new Job({
            title: jobTitle,
            type: jobType,
            department: jobDepartment,
            minXP: jobMinXP,
            maxXP: jobMaxXP,
            minSalary: jobMinSalary,
            maxSalary: jobMaxSalary,
            description: jobDescription,
            responsibilities: jobResponsibilities,
            qualifications: jobQualifications
        })

        await newJob.save();

        res.status(200).json(newJob);
    } catch (error) {
        console.log(error);
        res.status(400).json({ 'error': error })
    }
}

export const editJob = async (req, res, next) => {
    const {
        jobID,
        editedJobTitle,
        editedJobType,
        editedJobDepartment,
        editedJobMinXP,
        editedJobMaxXP,
        editedJobMinSalary,
        editedJobMaxSalary,
        editedJobDescription,
        editedJobResponsibilities,
        editedJobQualifications
    } = req.body

    try {
        const job = await Job.findById({ _id: jobID });

        if (editedJobTitle) {
            job.title = editedJobTitle;
        }
        if (editedJobType) {
            job.type = editedJobType;
        }
        if (editedJobDepartment) {
            job.department = editedJobDepartment;
        }
        if (editedJobMinXP) {
            job.minXP = editedJobMinXP;
        }
        if (editedJobMaxXP) {
            job.maxXP = editedJobMaxXP;
        }
        if (editedJobMinSalary) {
            job.minSalary = editedJobMinSalary;
        }
        if (editedJobMaxSalary) {
            job.maxSalary = editedJobMaxSalary;
        }
        if (editedJobDescription) {
            job.description = editedJobDescription;
        }
        if (editedJobResponsibilities) {
            job.responsibilities = editedJobResponsibilities;
        }
        if (editedJobQualifications) {
            job.qualifications = editedJobQualifications;
        }

        await job.save();

        res.status(200).json(job);

    } catch (error) {
        console.log(error);
        res.status(400).json({ 'error': error })
    }
}

export const deleteJob = async (req, res, next) => {
    const { jobID } = req.params;
    await Job.deleteOne({ _id: jobID });
    
    const jobs = await Job.find({});
    res.status(200).json(jobs);
}