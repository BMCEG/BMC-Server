import mongoose from 'mongoose';

const tutorSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
});

export default mongoose.model('Tutor', tutorSchema);
