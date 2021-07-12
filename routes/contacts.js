import express from 'express';
import { getContacts, getContact, createContact, editContact } from '../controllers/contacts.js';

const router = express.Router();

router.get('/', getContacts);
router.get('/:id', getContact);
router.post('/create', createContact);
router.post('/:id/edit', editContact);

export default router;