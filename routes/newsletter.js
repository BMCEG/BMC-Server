import express from 'express';
import { getNewsletters, createNewsletter, deleteNewsletter } from '../controllers/newsletter.js';

const router = express.Router();

router.get('/', getNewsletters);
router.post('/:newsletterID/delete', deleteNewsletter);
router.post('/create', createNewsletter);

export default router;