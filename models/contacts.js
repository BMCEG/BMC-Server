import mongoose from 'mongoose';

const contactSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    mobile: {
        type: String,
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
});

export default mongoose.model('Contact', contactSchema);
