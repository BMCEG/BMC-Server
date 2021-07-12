import express from "express";
import { getTrainers, createTrainer, addImage, deleteTrainer, getTrainer, editTrainer } from '../controllers/trainers.js';
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images/trainers");
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g, "-")}`;
        cb(null, fileName);
    },
});
const upload = multer({ storage }).single("image");


router.get('/', getTrainers)
router.get('/:trainerID', getTrainer)
router.post('/:trainerID/delete', deleteTrainer);
router.post('/:trainerID/edit', editTrainer);
router.post('/create', createTrainer)
router.post("/addImage", upload, addImage);


export default router;