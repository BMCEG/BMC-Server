import randomstring from "randomstring";
import bcrypt from "bcryptjs";
import Course from "../models/courses.js";
import CourseApplication from "../models/courseApplications.js";

export const getApplication = async (req, res, next) => {
    const {
        applicantUsername,
        courseName
    } = req.query;

    const course = await Course.findOne({ name: courseName });
    const application = await CourseApplication.findOne({ $and: [{ username: applicantUsername }, { course: course._id }] })

    res.status(200).json(application);
}

export const getApplications = async (req, res, next) => {
    const applications = await CourseApplication.find({}).populate('course');

    res.status(200).json(applications);
}
export const createApplication = async (req, res, next) => {
    const {
        applicationName,
        applicationSchedule,
        applicationMobileNumber,
        applicationEmail,
        applicationCourse
    } = req.body;

    const course = await Course.findById({ _id: applicationCourse });
    
    let schedule = {};
    
    for(let i=0; i<course.schedules.length; i++){
        if(course.schedules[i]._id == applicationSchedule){
            schedule = course.schedules[i];
            break;
        }
    }

    // let username = randomstring.generate(7);
    // let password = randomstring.generate(14);
    // let hashedPassword = await bcrypt.hash(password, 10);

    const newApplication = new CourseApplication({
        name: applicationName,
        mobile: applicationMobileNumber,
        email: applicationEmail,
        course: course._id,
        // username,
        // password: hashedPassword
        schedule: schedule
    })

    await newApplication.save();

    res.status(200).json(newApplication);
}
