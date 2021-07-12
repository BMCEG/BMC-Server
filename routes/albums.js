import express from 'express';
import { getAlbums, createAlbum, getAlbum, deleteAlbum } from '../controllers/albums.js';

const router = express.Router();

router.get('/', getAlbums);
router.get('/:albumID', getAlbum);
router.post('/create', createAlbum);
router.post('/:albumID/delete', deleteAlbum);


export default router;