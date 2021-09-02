import mongoose from 'mongoose';

const requestSchema = mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true
  },
  facebook: {
    type: String,
    required: true
  },
  instagram: {
    type: String,
    required: true
  },
  linkedin: {
    type: String,
    required: true
  },
  instagram: {
    type: String,
    required: true
  },
  twitter: {
    type: String,
    required: true
  },
  youtube: {
    type: String,
    required: true
  },
  goals: {
    type: String,
    required: true
  },
  challenges: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  }
});

export default mongoose.model('Request', requestSchema);
