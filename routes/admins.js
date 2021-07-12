import express from 'express';
import { login, register, getAdmin, addImage, getAdmins, deleteAdmin } from '../controllers/admins.js';
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images/");
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g, "-")}`;
        cb(null, fileName);
    },
});
const upload = multer({ storage }).single("image");

router.get('/', getAdmins);
router.get('/:adminID', getAdmin);
router.post('/:adminID/delete', deleteAdmin);
router.post('/login', login);
router.post('/register', register);
// router.post('/create', createAlbum);
// router.post('/:albumID', deleteAlbum);

router.post("/addImage", upload, addImage);

export default router;