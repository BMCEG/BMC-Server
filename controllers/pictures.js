import { ApiError } from "../middlewares/apiError.js";
import Picture from '../models/pictures.js';

export const addImage = async (req, res, next) => {
    res.status(200).json({
        filename: req.file.filename
    })
}

export const getPictures = async (req, res, next) => {
    let pictures = [];
    pictures = await Picture.find({});
    res.status(200).json(pictures);
}

// export const getBlog = async (req, res, next) => {
//     const { blogID } = req.params;

//     let blog = await Blog.findById({ _id: blogID });
//     if (!blog) {
//         next(ApiError.badRequest("Couldn't find any blog with the entered _id"));
//         return;
//     }

//     res.status(200).json(blog);
// }

export const createPicture = async (req, res, next) => {
    const {
        src,
        url,
        type
    } = req.body;

    try {
        const newPicture = new Picture({
            src,
            url,
            type
        })

        await newPicture.save();

        res.status(200).json(newPicture);
    } catch (error) {
        console.log(error);
        res.status(400).json({ 'error': error })
    }
}

