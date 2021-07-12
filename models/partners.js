import mongoose from 'mongoose';

const partnersSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    }
});

export default mongoose.model('Partner', partnersSchema);
