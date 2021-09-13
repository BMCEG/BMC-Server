// import dotenv from "dotenv";
// dotenv.config();
import bodyParser from "body-parser";
import express from "express";
import mongoose from 'mongoose';
import cors from "cors";
import morgan from 'morgan';
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

app.use('/admins', adminRoutes);
app.use('/albums', albumRoutes);
app.use('/blogs', blogRoutes);
app.use('/contacts', contactRoutes);
app.use('/courses', coursesRoutes);
app.use('/coursesApplications', courseApplicationRoutes);
app.use('/jobs', jobRoutes);
app.use('/jobsApplications', jobApplicationRoutes);
app.use('/landing', landingRoutes);
app.use('/newsletters', newsletterRoutes);
app.use('/partners', partnersRoutes);
app.use('/pictures', pictureRoutes);
app.use('/requests', requestRoutes);
app.use('/trainers', trainerRoutes);
app.use(apiErrorHandler);
app.use('/images/', express.static('data'))
app.use('/images/', express.static('images/partners'))
app.use('/images/', express.static('images/blogs'))
app.use('/images/', express.static('images'))
app.use('/images/', express.static('images/gallery'))
app.use('/images/', express.static('images/trainers'))
app.use('/images/', express.static('data/resumes'))

const CONNECTION_URL = 'mongodb+srv://bmcWebsiteProd:XAhBNptS4HbNfjQv@cluster0.druxa.mongodb.net/bmc-website-prod?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
