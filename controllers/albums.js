import Album from '../models/albums.js';
import { ApiError } from "../middlewares/apiError.js";
import Picture from '../models/pictures.js';

export const getAlbums = async (req, res, next) => {
    let albums = [];
    albums = await Album.find({}).populate('pictures');
    res.status(200).json(albums);
}

export const getAlbum = async (req, res, next) => {
    const { albumID } = req.params;

    let album = await Album.findById({ _id: albumID });
    if (!album) {
        next(ApiError.badRequest("Couldn't find any album with the entered _id"));
        return;
    }

    res.status(200).json(album);
}

export const createAlbum = async (req, res, next) => {
    const {
        name,
        description,
        pictures,
    } = req.body;

    // let pictureDocs = [];

    // for (let i = 0; i < pictures.length; i++) {
    //     let pictureDoc = await Picture.findById({ _id: pictures[i] });

    //     pictureDocs.push(pictureDoc);
    // }

    try {
        const newAlbum = new Album({
            name,
            description,
            pictures
        })

        await newAlbum.save();

        res.status(200).json(newAlbum);
    } catch (error) {
        console.log(error);
        res.status(400).json({ 'error': error })
    }
}

export const deleteAlbum = async (req, res, next) => {
    const { albumID } = req.params;

    await Album.deleteOne({ _id: albumID });

    const albums = await Album.find({});

    res.status(200).json(albums)
}