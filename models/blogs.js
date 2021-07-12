import mongoose from 'mongoose';

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    },
    author: {
        type: String,
    },
    image: {
        type: String
    },
    dateCreated: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

export default mongoose.model('Blog', blogSchema);
