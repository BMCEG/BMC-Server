import mongoose from 'mongoose';

const jobSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    minXP: {
        type: Number,
        required: true
    },
    maxXP: {
        type: Number,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    description: {
        type: String,
        required: true
    },
    responsibilities: [{
        type: String
    }],
    qualifications: [{
        type: String
    }],
    type: {
        type: String,
        required: true
    },
    minSalary: {
        type: Number,
    },
    maxSalary: {
        type: Number,
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "JobApplication"
            // required: true
        }
    ]
});

export default mongoose.model('Job', jobSchema);
