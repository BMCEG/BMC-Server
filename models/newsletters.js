import mongoose from 'mongoose';

const newsletterSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    dateSubscribed: {
        type: Date,
        default: Date.now()
    },
});

export default mongoose.model('Newsletter', newsletterSchema);
