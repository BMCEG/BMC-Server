import mongoose from 'mongoose';

const requestSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: true
  },
  isRead: {
    type: Boolean,
    default: false
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  }
});

export default mongoose.model('Request', requestSchema);
