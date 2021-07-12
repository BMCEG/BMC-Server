import mongoose from 'mongoose';

const jobApplicationSchema = mongoose.Schema({
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
  address: {        
    type: String,
    required: true
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  },
  age: {
    type: Number,
  },
  resume:{
      type: String,
      // required: true
  }
});

export default mongoose.model('JobApplication', jobApplicationSchema);
