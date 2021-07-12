import mongoose from 'mongoose';

const courseApplicationSchema = mongoose.Schema({
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
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  isRead: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String,
  },
  isContacted: {
    type: Boolean,
    default: false
  },
  schedule: {
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
  }
});

export default mongoose.model('CourseApplication', courseApplicationSchema);
