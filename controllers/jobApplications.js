import { ApiError } from "../middlewares/apiError.js";
import JobApplication from "../models/jobApplications.js";
import JoinApplication from "../models/joinApplications.js";
import moment from 'moment';
import Job from "../models/jobs.js";

export const getApplications = async (req, res, next) => {
    const applications = await JobApplication.find({}).populate('job');

    res.status(200).json(applications);

}

export const getApplication = async (req, res, next) => {
    const { applicationID } = req.query;

    const application = await JobApplication.findById({ _id: applicationID }).populate('job');

    if (!application) {
        next(ApiError.badRequest("Couldn't find any application with the entered _id"));
        return;
    }

    res.status(200).json(application);
}

export const createApplication = async (req, res, next) => {
    const {
        name,
        email,
        mobile,
        address,
        jobID,
        birthday,
        resume,
    } = req.body;

    try {
        const job = await Job.findById({ _id: jobID });

        const newApplication = new JobApplication({
            name,
            email,
            mobile,
            address,
            job,
            birthday,
            resume
        })

        const age = moment(newApplication.dateCreated).year() - moment(birthday).year()
        newApplication.age = age;
        await newApplication.save();
        console.log(newApplication)
        res.status(200).json(newApplication);
    } catch (error) {
        console.log(error);
        res.status(400).json({ 'error': error })
    }
}
export const createJoinApplication = async (req, res, next) => {
    const {
        name,
        email,
        mobile,
        address,
        // jobID,
        age,
        resume,
        message,
        specialities
    } = req.body;

    try {
        // const job = await Job.findById({ _id: jobID });
        const newApplication = new JoinApplication({
            name,
            email,
            mobile,
            address,
            // job,
            age,
            resume,
            message,
            specialities
        })

        // const age = moment(newApplication.dateCreated).year() - moment(birthday).year()
        // newApplication.age = age;

        await newApplication.save();

        res.status(200).json(newApplication);
    } catch (error) {
        console.log(error);
        res.status(400).json({ 'error': error })
    }
}

export const addResume = async (req, res, next) => {
    console.log('here', req.file)
    res.status(200).json({
        filename: req.file.filename
    })
}