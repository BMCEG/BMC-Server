import mongoose from 'mongoose';

const joinApplicationSchema = mongoose.Schema({
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
  // job: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Job",
  //   required: true
  // },
  age: {
    type: String,
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
  },
  message: {
    type: String,
  },
  specialities: [{
    type: String
  }]
});

export default mongoose.model('JoinApplication', joinApplicationSchema);
