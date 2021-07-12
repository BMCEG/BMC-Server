import { ApiError } from "../middlewares/apiError.js";
import Newsletter from '../models/newsletters.js';

export const getNewsletters = async (req, res, next) => {
    let newsletters = [];
    newsletters = await Newsletter.find({});
    res.status(200).json(newsletters);
}

// export const getNewsletter = async (req, res, next) => {
//     const { newsletterID } = req.params;

//     let newsletter = await Blog.findById({ _id: newsletterID });
//     if (!newsletter) {
//         next(ApiError.badNewsletter("Couldn't find any newsletter with the entered _id"));
//         return;
//     }

//     res.status(200).json(newsletter);
// }

export const createNewsletter = async (req, res, next) => {
    const {
        email,
    } = req.body;

    try {
        const newNewsletter = new Newsletter({
            email,
        })

        await newNewsletter.save();

        res.status(200).json(newNewsletter);
    } catch (error) {
        console.log(error);
        res.status(400).json({ 'error': error })
    }
}

export const deleteNewsletter = async (req, res, next) => {
    const {
        newsletterID
    } = req.body;

    await Newsletter.deleteOne({ _id: newsletterID });

    res.status(200).json({
        "message": "Newsletter has been deleted successfully"
    })

}

// export const editNewsletter = async (req, res, next) => {
//     const {
//         newsletterID,
//         editedIsRead
//     } = req.body;

//     try {
//         const newsletter = await Newsletter.findById({ _id: newsletterID });

//         if (!Newsletter) {
//             next(ApiError.badNewsletter("Couldn't find any newsletter with the entered _id"));
//             return;

//         }

//         if (editedIsRead) {
//             newsletter.isRead = editedIsRead;
//         }

//         await newsletter.save();

//         res.status(200).json(newsletter);
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({
//             "error": error
//         })
//     }
// }
