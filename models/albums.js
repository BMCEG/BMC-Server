import mongoose from 'mongoose';

const albumsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pictures: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Picture",
        required: true
    }],
    description: {
        type: String,
        required: true
    }
});

export default mongoose.model('Album', albumsSchema);
