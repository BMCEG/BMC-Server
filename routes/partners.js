import express from 'express';
import { getPartners, createPartner, editPartner, getPartner, deletePartner, addImage } from '../controllers/partners.js';
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images/partners");
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g, "-")}`;
        cb(null, fileName);
    },
});
const upload = multer({ storage }).single("image");

router.get('/', getPartners);
router.get('/:partnerID', getPartner);
router.post('/create', createPartner);
router.post('/:partnerID/edit', editPartner);
router.post('/:partnerID/delete', deletePartner);

router.post("/addImage", upload, addImage);

export default router;