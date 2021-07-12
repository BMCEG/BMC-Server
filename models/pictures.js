import mongoose from 'mongoose';

const picturesSchema = mongoose.Schema({
    src: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    type: {
        type: String
    }
});

export default mongoose.model('Picture', picturesSchema);
