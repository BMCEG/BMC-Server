import express from 'express';
import { getJobs, getJob, createJob, deleteJob, editJob } from '../controllers/jobs.js';

const router = express.Router();

router.get('/', getJobs);
router.get('/:id', getJob);
router.post('/create', createJob);
router.post('/:jobID/edit', editJob);
router.post('/:jobID/delete', deleteJob);

export default router;