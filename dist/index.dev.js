"use strict";

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _apiErrorHandler = require("./middlewares/apiErrorHandler.js");

var _admins = _interopRequireDefault(require("./routes/admins.js"));

var _albums = _interopRequireDefault(require("./routes/albums.js"));

var _blogs = _interopRequireDefault(require("./routes/blogs.js"));

var _contacts = _interopRequireDefault(require("./routes/contacts.js"));

var _courses = _interopRequireDefault(require("./routes/courses.js"));

var _courseApplications = _interopRequireDefault(require("./routes/courseApplications.js"));

var _jobs = _interopRequireDefault(require("./routes/jobs.js"));

var _jobApplications = _interopRequireDefault(require("./routes/jobApplications.js"));

var _landing = _interopRequireDefault(require("./routes/landing.js"));

var _newsletter = _interopRequireDefault(require("./routes/newsletter.js"));

var _partners = _interopRequireDefault(require("./routes/partners.js"));

var _pictures = _interopRequireDefault(require("./routes/pictures.js"));

var _requests = _interopRequireDefault(require("./routes/requests.js"));

var _trainers = _interopRequireDefault(require("./routes/trainers.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import dotenv from "dotenv";
// dotenv.config();
var app = (0, _express["default"])();
app.use(_bodyParser["default"].json({
  limit: "30mb",
  extended: true
}));
app.use(_bodyParser["default"].urlencoded({
  limit: "30mb",
  extended: true
}));
app.use((0, _cors["default"])());
app.use((0, _morgan["default"])('dev'));
app.use('/api/admins', _admins["default"]);
app.use('/api/albums', _albums["default"]);
app.use('/api/blogs', _blogs["default"]);
app.use('/api/contacts', _contacts["default"]);
app.use('/api/courses', _courses["default"]);
app.use('/api/coursesApplications', _courseApplications["default"]);
app.use('/api/jobs', _jobs["default"]);
app.use('/api/jobsApplications', _jobApplications["default"]);
app.use('/api/landing', _landing["default"]);
app.use('/api/newsletters', _newsletter["default"]);
app.use('/api/partners', _partners["default"]);
app.use('/api/pictures', _pictures["default"]);
app.use('/api/requests', _requests["default"]);
app.use('/api/trainers', _trainers["default"]);
app.use(_apiErrorHandler.apiErrorHandler);
app.use('/api/', _express["default"]["static"]('data'));
app.use('/api/', _express["default"]["static"]('images/partners'));
app.use('/api/', _express["default"]["static"]('images/blogs'));
app.use('/api/', _express["default"]["static"]('images'));
app.use('/api/', _express["default"]["static"]('images/gallery'));
app.use('/api/', _express["default"]["static"]('images/trainers'));
app.use('/api/', _express["default"]["static"]('data/resumes'));
var CONNECTION_URL = 'mongodb+srv://bmcWebsiteProd:XAhBNptS4HbNfjQv@cluster0.druxa.mongodb.net/bmc-website?retryWrites=true&w=majority';
var PORT = process.env.PORT || 5000;

_mongoose["default"].connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(function () {
  return app.listen(PORT, function () {
    return console.log("Server running on port: ".concat(PORT));
  });
})["catch"](function (error) {
  return console.log(error.message);
});

_mongoose["default"].set('useFindAndModify', false);