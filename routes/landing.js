import express from 'express';
import { getLanding } from '../controllers/landing.js';

const router = express.Router();

router.get('/:landingName', getLanding);

export default router;