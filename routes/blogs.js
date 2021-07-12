import express from 'express';
import { getBlogs, getBlog, createBlog, editBlog, deleteBlog, addImage } from '../controllers/blogs.js';
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

router.get('/', getBlogs);
router.get('/:blogID', getBlog);
router.post('/create', createBlog);
router.post('/:blogID/edit', editBlog);
router.post('/:blogID/delete', deleteBlog);

router.post("/addImage", upload, addImage);


export default router;