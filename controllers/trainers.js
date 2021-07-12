import Trainer from "../models/trainers.js";

export const addImage = async (req, res, next) => {
    res.status(200).json({
        filename: req.file.filename
    })
}
export const getTrainer = async (req, res, next) => {
    const { trainerID } = req.params;

    let trainer = await Trainer.findById({ _id: trainerID });
    if (!trainer) {
        next(ApiError.badTrainer("Couldn't find any trainer with the entered _id"));
        return;
    }

    res.status(200).json(trainer);
}

export const createTrainer = async (req, res, next) => {
    const {
        firstName,
        lastName,
        qualifications,
        photoUrl
    } = req.body;

    try {
        const newTrainer = new Trainer({
            firstName,
            lastName,
            qualifications,
            photoUrl
        })

        await newTrainer.save();

        res.status(200).json(newTrainer);
    } catch (error) {
        console.log(error);
        res.status(400).json({ "error": error });
    }

}

export const getTrainers = async (req, res, next) => {
    const trainers = await Trainer.find({});
    res.status(200).json(trainers)
}

export const deleteTrainer = async (req, res, next) => {
    const { trainerID } = req.params;
    await Trainer.deleteOne({ _id: trainerID });
    
    const trainers = await Trainer.find({});
    res.status(200).json(trainers);
}


export const editTrainer = async (req, res, next) => {
    const {
        trainerID,
        editedFirstName,
        editedLastName,
        editedPhoto,
        editedQualifications,
    } = req.body;

    try {
        const trainer = await Trainer.findById({ _id: trainerID });

        if(!trainer){
            next(ApiError.badTrainer("Couldnt find data for the entered trainerID"));
            return;
        }

        if(editedFirstName){
            trainer.firstName = editedFirstName;
        }
        if(editedLastName){
            trainer.lastName = editedLastName;
        }
        if(editedPhoto){
            trainer.photoUrl = editedPhoto;
        }
        if(editedQualifications){
            trainer.qualifications = editedQualifications;
        }

        await trainer.save();

        res.status(200).json(trainer);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            'error': error
        })
    }
}