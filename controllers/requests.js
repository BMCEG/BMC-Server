import { ApiError } from "../middlewares/apiError.js";
import Request from '../models/requests.js';

export const getRequests = async (req, res, next) => {
    let requests = [];
    requests = await Request.find({});
    res.status(200).json(requests);
}

export const getRequest = async (req, res, next) => {
    const { requestID } = req.params;

    let request = await Blog.findById({ _id: requestID });
    if (!request) {
        next(ApiError.badRequest("Couldn't find any request with the entered _id"));
        return;
    }

    res.status(200).json(request);
}

export const createRequest = async (req, res, next) => {
    const {
        consultancyBusinessType,
        consultancyBusinessWebsite,
        consultancyBusinessFacebook,
        consultancyBusinessLinkedIn,
        consultancyBusinessInstagram,
        consultancyBusinessTwitter,
        consultancyBusinessYouTube,
        consultancyBusinessGoals,
        consultancyBusinessChallenges
    } = req.body;

    try {
        const newRequest = new Request({
            type: consultancyBusinessType,
            website: consultancyBusinessWebsite,
            facebook: consultancyBusinessFacebook,
            linkedin: consultancyBusinessLinkedIn,
            instagram: consultancyBusinessInstagram,
            twitter: consultancyBusinessTwitter,
            youtube: consultancyBusinessYouTube,
            goals: consultancyBusinessGoals,
            challenges: consultancyBusinessChallenges
        })

        await newRequest.save();

        res.status(200).json(newRequest);
    } catch (error) {
        console.log(error);
        res.status(400).json({ 'error': error })
    }
}

export const editRequest = async (req, res, next) => {
    const {
        requestID,
        editedIsRead
    } = req.body;

    try {
        const request = await Request.findById({ _id: requestID });

        if (!Request) {
            next(ApiError.badRequest("Couldn't find any request with the entered _id"));
            return;

        }

        if (editedIsRead) {
            request.isRead = editedIsRead;
        }

        await request.save();

        res.status(200).json(request);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            "error": error
        })
    }
}
