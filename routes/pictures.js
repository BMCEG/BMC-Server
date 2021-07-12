import express from 'express';
import { getPictures, createPicture, addImage } from '../controllers/pictures.js';
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images/gallery");
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g, "-")}`;
        cb(null, fileName);
    },
});

const upload = multer({ storage }).single("image");
router.get('/', getPictures);
// router.get('/:blogID', getBlog);
router.post('/create', createPicture);

router.post("/addImage", upload, addImage);

export default router;