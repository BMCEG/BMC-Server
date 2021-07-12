import mongoose from 'mongoose';

const landingSchema = mongoose.Schema({
    name: String,
    displayName: String,
    description: String,
    price: Number,
});

export default mongoose.model('Landing', landingSchema);
