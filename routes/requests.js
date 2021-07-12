import express from 'express';
import { getRequests, getRequest, createRequest, editRequest } from '../controllers/requests.js';

const router = express.Router();

router.get('/', getRequests);
router.get('/:requestID', getRequest);
router.post('/create', createRequest);
router.post('/:requestID', editRequest);

export default router;