import express from 'express';
import { getCourse, getCourses, createCourse, editCourse, deleteCourse, getCourseByID, addImage } from '../controllers/courses.js';
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images/blogs");
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g, "-")}`;
        cb(null, fileName);
    },
});
const upload = multer({ storage }).single("image");

router.get('/:courseName', getCourse);
router.get('/id/:courseID', getCourseByID);
router.get('/', getCourses);

router.post('/create', createCourse);
router.post('/:courseID/edit', editCourse);
router.post('/:courseID/delete', deleteCourse);
// router.post('/login', courseLogin)
router.post("/addImage", upload, addImage);

export default router;