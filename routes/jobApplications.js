import express from 'express';
import { getApplications, getApplication, createApplication, addResume, createJoinApplication } from '../controllers/jobApplications.js';
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./data/resumes");
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g, "-")}`;
        cb(null, fileName);
    },
});
const upload = multer({ storage }).single("resume");

router.get('/', getApplications);
router.get('/:id', getApplication);
router.post('/create', createApplication);
router.post('/join', createJoinApplication);
router.post("/addResume", upload, addResume);


export default router;