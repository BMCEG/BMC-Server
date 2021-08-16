"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editCourse = exports.createCourse = exports.deleteCourse = exports.getCourses = exports.getCourseByID = exports.addImage = exports.getCourse = void 0;

var _courses = _interopRequireDefault(require("../models/courses.js"));

var _courseApplications = _interopRequireDefault(require("../models/courseApplications.js"));

var _randomstring = _interopRequireDefault(require("randomstring"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _apiError = require("../middlewares/apiError.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var JWT_SECRET = "XDBe12H884K_dyn_SL3O57hvKaDRmSJ59ASNyVAlk0c6YstvhM87HGrpdMT6CMmPEI_r1LWhpAgGXAcKYG2wBRTtbsDIua";

var getCourse = function getCourse(req, res, next) {
  var courseName, course;
  return regeneratorRuntime.async(function getCourse$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          courseName = req.params.courseName;
          _context.next = 3;
          return regeneratorRuntime.awrap(_courses["default"].findOne({
            title: courseName
          }).populate("trainer"));

        case 3:
          course = _context.sent;

          if (course) {
            _context.next = 7;
            break;
          }

          next(_apiError.ApiError.badRequest("Couldnt find data for the entered courseName"));
          return _context.abrupt("return");

        case 7:
          res.status(200).json(course);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getCourse = getCourse;

var addImage = function addImage(req, res, next) {
  return regeneratorRuntime.async(function addImage$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log('req.files');
          res.status(200).json({
            filename: req.file.filename
          });

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.addImage = addImage;

var getCourseByID = function getCourseByID(req, res, next) {
  var courseID, course;
  return regeneratorRuntime.async(function getCourseByID$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          courseID = req.params.courseID;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_courses["default"].findById({
            _id: courseID
          }).populate("trainer"));

        case 3:
          course = _context3.sent;

          if (course) {
            _context3.next = 7;
            break;
          }

          next(_apiError.ApiError.badRequest("Couldnt find data for the entered courseID"));
          return _context3.abrupt("return");

        case 7:
          res.status(200).json(course);

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.getCourseByID = getCourseByID;

var getCourses = function getCourses(req, res, next) {
  var company, courses;
  return regeneratorRuntime.async(function getCourses$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          company = req.query.company;
          console.log(req.query);
          _context4.next = 4;
          return regeneratorRuntime.awrap(_courses["default"].find({
            company: company
          }).populate("trainer"));

        case 4:
          courses = _context4.sent;
          res.status(200).json(courses);

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.getCourses = getCourses;

var deleteCourse = function deleteCourse(req, res, next) {
  var courseID, courses;
  return regeneratorRuntime.async(function deleteCourse$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          courseID = req.params.courseID;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_courses["default"].deleteOne({
            _id: courseID
          }));

        case 3:
          _context5.next = 5;
          return regeneratorRuntime.awrap(_courses["default"].find({}));

        case 5:
          courses = _context5.sent;
          res.status(200).json(courses);

        case 7:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.deleteCourse = deleteCourse;

var createCourse = function createCourse(req, res, next) {
  var _req$body, title, displayTitle, description, outline, methedology, trainer, fees, schedules, images, company, newCourse;

  return regeneratorRuntime.async(function createCourse$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _req$body = req.body, title = _req$body.title, displayTitle = _req$body.displayTitle, description = _req$body.description, outline = _req$body.outline, methedology = _req$body.methedology, trainer = _req$body.trainer, fees = _req$body.fees, schedules = _req$body.schedules, images = _req$body.images, company = _req$body.company;
          _context6.prev = 1;
          newCourse = new _courses["default"]({
            title: title,
            displayTitle: displayTitle,
            description: description,
            outline: outline,
            methedology: methedology,
            trainer: trainer,
            company: company,
            fees: fees,
            schedules: schedules,
            images: images
          });
          _context6.next = 5;
          return regeneratorRuntime.awrap(newCourse.save());

        case 5:
          res.status(200).json(newCourse);
          _context6.next = 12;
          break;

        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](1);
          console.log(_context6.t0);
          res.status(400).json({
            "error": _context6.t0
          });

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

exports.createCourse = createCourse;

var editCourse = function editCourse(req, res, next) {
  var _req$body2, courseID, editedTitle, editedDisplayTitle, editedDescription, editedOutline, editedMethedology, editedTrainer, editedFees, editedSchedules, course;

  return regeneratorRuntime.async(function editCourse$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _req$body2 = req.body, courseID = _req$body2.courseID, editedTitle = _req$body2.editedTitle, editedDisplayTitle = _req$body2.editedDisplayTitle, editedDescription = _req$body2.editedDescription, editedOutline = _req$body2.editedOutline, editedMethedology = _req$body2.editedMethedology, editedTrainer = _req$body2.editedTrainer, editedFees = _req$body2.editedFees, editedSchedules = _req$body2.editedSchedules;
          _context7.prev = 1;
          _context7.next = 4;
          return regeneratorRuntime.awrap(_courses["default"].findById({
            _id: courseID
          }));

        case 4:
          course = _context7.sent;

          if (course) {
            _context7.next = 8;
            break;
          }

          next(_apiError.ApiError.badRequest("Couldnt find data for the entered courseID"));
          return _context7.abrupt("return");

        case 8:
          if (editedTitle) {
            course.title = editedTitle;
          }

          if (editedDisplayTitle) {
            course.displayTitle = editedDisplayTitle;
          }

          if (editedDescription) {
            course.description = editedDescription;
          }

          if (editedOutline) {
            course.outline = editedOutline;
          }

          if (editedMethedology) {
            course.methedology = editedMethedology;
          }

          if (editedTrainer) {
            course.trainer = editedTrainer;
          }

          if (editedFees) {
            course.fees = editedFees;
          }

          if (editedSchedules) {
            course.schedules = editedSchedules;
          }

          _context7.next = 18;
          return regeneratorRuntime.awrap(course.save());

        case 18:
          res.status(200).json(course);
          _context7.next = 25;
          break;

        case 21:
          _context7.prev = 21;
          _context7.t0 = _context7["catch"](1);
          console.log(_context7.t0);
          res.status(400).json({
            'error': _context7.t0
          });

        case 25:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[1, 21]]);
};

exports.editCourse = editCourse;