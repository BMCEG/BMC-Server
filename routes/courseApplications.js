import express from 'express';
import { createApplication, getApplications  } from '../controllers/courseApplications.js';

const router = express.Router();

router.get('/', getApplications);
router.post('/create', createApplication);

export default router;