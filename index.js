// import dotenv from "dotenv";
// dotenv.config();
// import bodyParser from "body-parser";
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
// import express from "express";
// import mongoose from 'mongoose';
// import cors from "cors";
// import morgan from 'morgan';
import { apiErrorHandler } from './middlewares/apiErrorHandler.js';

import adminRoutes from './routes/admins.js';
import albumRoutes from "./routes/albums.js";
import blogRoutes from "./routes/blogs.js";
import contactRoutes from "./routes/contacts.js";
import coursesRoutes from "./routes/courses.js";
import courseApplicationRoutes from "./routes/courseApplications.js";
import jobRoutes from "./routes/jobs.js";
import jobApplicationRoutes from "./routes/jobApplications.js";
import landingRoutes from "./routes/landing.js";
import newsletterRoutes from "./routes/newsletter.js";
import partnersRoutes from "./routes/partners.js";
import pictureRoutes from "./routes/pictures.js";
import requestRoutes from './routes/requests.js';
import trainerRoutes from "./routes/trainers.js";

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
