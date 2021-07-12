import Contact from '../models/contacts.js';
import { ApiError } from "../middlewares/apiError.js";

export const getContacts = async (req, res, next) => {
    let contacts = [];
    contacts = await Contact.find({});
    res.status(200).json(contacts);
}

export const getContact = async (req, res, next) => {
    const { contactID } = req.query;

    let contact = await Contact.findById({ _id: contactID });
    if (!contact) {
        next(ApiError.badRequest("Couldn't find any contact with the entered _id"));
        return;
    }

    res.status(200).json(contact);
}

export const createContact = async (req, res, next) => {
    const {
        contactFirstName,
        contactLastName,
        contactEmail,
        contactMobile,
        contactMessage
    } = req.body;

    try {
        const newContact = new Contact({
            firstName: contactFirstName,
            lastName: contactLastName,
            email: contactEmail,
            mobile: contactMobile,
            message: contactMessage
        })

        await newContact.save();

        res.status(200).json(newContact);
    } catch (error) {
        console.log(error);
        res.status(400).json({ 'error': error })
    }
}

export const editContact = async (req, res, next) => {
    const {
        contactID,
        isRead,
        notes
    } = req.body

    try {

        const contact = await Contact.findById({ _id: contactID });

        if (isRead) {
            contact.isRead = isRead;
        }

        if (notes) {
            contact.notes = notes;
        }

        await contact.save();

        res.status(200).json(contact);

    } catch (error) {
        console.log(error);
        res.status(400).json({ 'error': error })
    }
}