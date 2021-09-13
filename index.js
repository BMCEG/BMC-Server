// import dotenv = require("dotenv";
// dotenv.config();
// import bodyParser = require("body-parser";
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
// import express = require("express";
// import mongoose = require('mongoose';
// import cors = require("cors";
// import morgan = require('morgan';
// import { apiErrorHandler } = require('./middlewares/apiErrorHandler.js';
const apiErrorHandler = require('./middlewares/apiErrorHandler.js');

const adminRoutes = require('./routes/admins.js');
const albumRoutes = require("./routes/albums.js");
const blogRoutes = require("./routes/blogs.js");
const contactRoutes = require("./routes/contacts.js");
const coursesRoutes = require("./routes/courses.js");
const courseApplicationRoutes = require("./routes/courseApplications.js");
const jobRoutes = require("./routes/jobs.js");
const jobApplicationRoutes = require("./routes/jobApplications.js");
const landingRoutes = require("./routes/landing.js");
const newsletterRoutes = require("./routes/newsletter.js");
const partnersRoutes = require("./routes/partners.js");
const pictureRoutes = require("./routes/pictures.js");
const requestRoutes = require('./routes/requests.js');
const trainerRoutes = require("./routes/trainers.js");

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.use('/api/admins', adminRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/coursesApplications', courseApplicationRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/jobsApplications', jobApplicationRoutes);
app.use('/api/landing', landingRoutes);
app.use('/api/newsletters', newsletterRoutes);
app.use('/api/partners', partnersRoutes);
app.use('/api/pictures', pictureRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/trainers', trainerRoutes);
app.use(apiErrorHandler);
app.use('/api/', express.static('data'))
app.use('/api/', express.static('images/partners'))
app.use('/api/', express.static('images/blogs'))
app.use('/api/', express.static('images'))
app.use('/api/', express.static('images/gallery'))
app.use('/api/', express.static('images/trainers'))
app.use('/api/', express.static('data/resumes'))

const CONNECTION_URL = 'mongodb+srv://bmcWebsiteProd:XAhBNptS4HbNfjQv@cluster0.druxa.mongodb.net/bmc-website-prod?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
