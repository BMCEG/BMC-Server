import mongoose from 'mongoose';

const trainerSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    photoUrl: {
        type: String,
        // required: true
    },
    qualifications: [{
        title: {
            type: String
        },
        brief: {
            type: String
        }
    }]
});

export default mongoose.model('Trainer', trainerSchema);
