import Blog from '../models/blogs.js';
import { ApiError } from "../middlewares/apiError.js";

export const addImage = async (req, res, next) => {
    res.status(200).json({
        filename: req.file.filename
    })
}

export const getBlogs = async (req, res, next) => {
    let blogs = [];
    blogs = await Blog.find({});
    res.status(200).json(blogs);
}

export const getBlog = async (req, res, next) => {
    const { blogID } = req.params;

    let blog = await Blog.findById({ _id: blogID });
    if (!blog) {
        next(ApiError.badRequest("Couldn't find any blog with the entered _id"));
        return;
    }

    res.status(200).json(blog);
}

export const createBlog = async (req, res, next) => {
    const {
        blogTitle,
        blogPost,
        blogAuthor,
        blogImage
    } = req.body;

    try {
        const newBlog = new Blog({
            title: blogTitle,
            post: blogPost,
            author: blogAuthor,
            image: blogImage
        })

        await newBlog.save();

        res.status(200).json(newBlog);
    } catch (error) {
        console.log(error);
        res.status(400).json({ 'error': error })
    }
}

export const editBlog = async (req, res, next) => {
    const { blogID, editedBlogTitle, editedBlogPost, editedBlogAuthor, editedBlogImage } = req.body;

    try {
        let editedBlog = await Blog.findById({ _id: blogID });
        console.log(editedBlog)
        if (!editedBlog) {
            next(ApiError.badRequest("Couldn't find any blog with the entered _id"));
            return;
        }

        if (editedBlogPost) {
            editedBlog.post = editedBlogPost
        }
        if (editedBlogAuthor) {
            editedBlog.author = editedBlogAuthor
        }
        if (editedBlogImage) {
            editedBlog.image = editedBlogImage
        }
        if (editedBlogTitle) {
            editedBlog.title = editedBlogTitle
        }

        await editedBlog.save();

        res.status(200).json(editedBlog);
    } catch (error) {
        console.log(error);
        res.status(400).json({ 'error': error });
    }
}

export const deleteBlog = async (req, res, next) => {
    const { blogID } = req.body;

    await Blog.deleteOne({ _id: blogID });

    res.status(200).json({
        "message": "Blog has been deleted successfully"
    })
}