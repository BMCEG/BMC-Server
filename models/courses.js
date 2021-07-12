import mongoose from 'mongoose';

const courseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    displayTitle: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    outline: {
        type: String
    },
    methedology: {
        type: String
    },
    trainer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trainer",
        // required: true
    },
    images: [
        {
            name: String,
            src: String
        }
    ],
    fees: {
        type: Number,
        required: true
    },
    schedules: [{
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        duration: { // in MONTHS
            type: Number,
            required: true
        },
        dates: [{
            weekday: {
                type: String,
            },
            startHour: {
                type: String
            },
            endHour: {
                type: String
            },
            duration: { // in HOURS
                type: Number
            }
        }]
    }]
});

export default mongoose.model('Course', courseSchema);
