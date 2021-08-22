import Course from "../models/courses.js";
import CourseApplication from "../models/courseApplications.js";
import randomstring from "randomstring";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApiError } from "../middlewares/apiError.js";

const JWT_SECRET =
    "XDBe12H884K_dyn_SL3O57hvKaDRmSJ59ASNyVAlk0c6YstvhM87HGrpdMT6CMmPEI_r1LWhpAgGXAcKYG2wBRTtbsDIua";

export const getCourse = async (req, res, next) => {
    const { courseName } = req.params;

    const course = await Course.findOne({ title: courseName }).populate("trainer");
    if (!course) {
        next(ApiError.badRequest("Couldnt find data for the entered courseName"));
        return;
    }
    res.status(200).json(course);
};

export const addImage = async (req, res, next) => {
    console.log('req.files')
    res.status(200).json({
        filename: req.file.filename
    })
}


export const getCourseByID = async (req, res, next) => {
    const { courseID } = req.params;

    const course = await Course.findById({ _id: courseID }).populate("trainer");
    if (!course) {
        next(ApiError.badRequest("Couldnt find data for the entered courseID"));
        return;
    }
    res.status(200).json(course);
};
export const getCourses = async (req, res, next) => {
    const { company } = req.query;
    let courses = [];
    if (company === 'all') {
        courses = await Course.find({}).populate("trainer");
    } else {
        courses = await Course.find({ company: company }).populate("trainer");
    }
    res.status(200).json(courses);
};

export const deleteCourse = async (req, res, next) => {
    const { courseID } = req.params;
    await Course.deleteOne({ _id: courseID });

    const courses = await Course.find({});
    res.status(200).json(courses);
}

export const createCourse = async (req, res, next) => {
    const {
        title,
        displayTitle,
        description,
        outline,
        methedology,
        trainer,
        fees,
        schedules,
        images,
        company
    } = req.body;

    try {
        const newCourse = new Course({
            title,
            displayTitle,
            description,
            outline,
            methedology,
            trainer,
            company,
            fees,
            schedules,
            images
        });

        await newCourse.save();

        res.status(200).json(newCourse);
    } catch (error) {
        console.log(error);
        res.status(400).json({ "error": error })
    }
}

export const editCourse = async (req, res, next) => {
    const {
        courseID,
        editedTitle,
        editedDisplayTitle,
        editedDescription,
        editedOutline,
        editedMethedology,
        editedTrainer,
        editedFees,
        editedSchedules
    } = req.body;

    try {
        const course = await Course.findById({ _id: courseID });

        if (!course) {
            next(ApiError.badRequest("Couldnt find data for the entered courseID"));
            return;
        }

        if (editedTitle) {
            course.title = editedTitle;
        }
        if (editedDisplayTitle) {
            course.displayTitle = editedDisplayTitle;
        }
        if (editedDescription) {
            course.description = editedDescription;
        }
        if (editedOutline) {
            course.outline = editedOutline;
        }
        if (editedMethedology) {
            course.methedology = editedMethedology;
        }
        if (editedTrainer) {
            course.trainer = editedTrainer;
        }
        if (editedFees) {
            course.fees = editedFees;
        }
        if (editedSchedules) {
            course.schedules = editedSchedules;
        }

        await course.save();

        res.status(200).json(course);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            'error': error
        })
    }
}