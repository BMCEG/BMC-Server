"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var courseSchema = _mongoose["default"].Schema({
  title: {
    type: String,
    required: true
  },
  displayTitle: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true,
    "enum": ['BMC', 'E-Wings']
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
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Trainer" // required: true

  },
  images: [{
    name: String,
    src: String
  }],
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
    duration: {
      // in MONTHS
      type: Number,
      required: true
    },
    dates: [{
      weekday: {
        type: String
      },
      startHour: {
        type: String
      },
      endHour: {
        type: String
      },
      duration: {
        // in HOURS
        type: Number
      }
    }]
  }]
});

var _default = _mongoose["default"].model('Course', courseSchema);

exports["default"] = _default;