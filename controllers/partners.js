import { ApiError } from "../middlewares/apiError.js";
import Partner from '../models/partners.js';

export const addImage = async (req, res, next) => {
    res.status(200).json({
        filename: req.file.filename
    })
}

export const getPartners = async (req, res, next) => {
    let partners = [];
    partners = await Partner.find({});
    res.status(200).json(partners);
}

export const getPartner = async (req, res, next) => {
    const { partnerID } = req.params;

    let partner = await Partner.findById({ _id: partnerID });
    if (!partner) {
        next(ApiError.badRequest("Couldn't find any partner with the entered _id"));
        return;
    }

    res.status(200).json(partner);
}

export const createPartner = async (req, res, next) => {
    const {
        name,
        description,
        logo,
        url
    } = req.body;

    try {
        const newPartner = new Partner({
            name,
            description,
            logo,
            url
        })

        await newPartner.save();

        res.status(200).json(newPartner);
    } catch (error) {
        console.log(error);
        res.status(400).json({ 'error': error })
    }
}

export const editPartner = async (req, res, next) => {
    const {
        partnerID,
        editedPartnerName,
        editedPartnerDescription,
        editedPartnerURL,
        editedPartnerLogo
    } = req.body;

    try {
        const partner = await Partner.findById({ _id: partnerID });

        if (!Partner) {
            next(ApiError.badRequest("Couldn't find any partner with the entered _id"));
            return;

        }

        if (editedPartnerName) {
            partner.name = editedPartnerName;
        }
        if (editedPartnerDescription) {
            partner.description = editedPartnerDescription;
        }
        if (editedPartnerURL) {
            partner.url = editedPartnerURL;
        }
        if (editedPartnerLogo) {
            partner.logo = editedPartnerLogo;
        }

        await partner.save();

        res.status(200).json(partner);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            "error": error
        })
    }
}

export const deletePartner = async (req, res, next) => {
    const { partnerID } = req.params;
    await Partner.deleteOne({ _id: partnerID });
    
    const partners = await Partner.find({});
    res.status(200).json(partners);
}
