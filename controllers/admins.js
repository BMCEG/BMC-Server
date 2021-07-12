import Admin from "../models/admins.js";
import { ApiError } from "../middlewares/apiError.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const JWT_SECRET =
    "XDBe12H884K_dyn_SL3O57hvKaDRmSJ59ASNyVAlk0c6YstvhM87HGrpdMT6CMmPEI_r1LWhpAgGXAcKYG2wBRTtbsDIua";

export const addImage = async (req, res, next) => {
    res.status(200).json({
        filename: req.file.filename
    })
}

export const getAdmins = async (req, res, next) => {
    const admins = await Admin.find({});
    res.status(200).json(admins);
}

export const getAdmin = async (req, res, next) => {
    const { adminID } = req.params;
    // console.log(req.params)
    const admin = await Admin.findById({ _id: adminID });

    if(!admin){
        next(ApiError.badRequest("Couldnt find admin with the requested _id"));
        return;
    }

    res.status(200).json(admin);
}
export const deleteAdmin = async (req, res, next) => {
    const { adminID } = req.params;
    await Admin.deleteOne({ _id: adminID });
    
    const admins = await Admin.find({});
    res.status(200).json(admins);
}

export const register = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({
            email: email,
            firstName,
            password: hashedPassword,
            lastName,
        })

        await newAdmin.save();

        res.status(200).json(newAdmin)

    } catch (error) {
        if (error) {
            res.status(404).json({ 'message': error.message });
        }
    }
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;
console.log(req.body)
    let admin = await Admin.findOne({ email: email });

    if (!admin) {
        next(ApiError.badRequest("Couldn't find any admin with the entered email"));
        return;
    }

    if (!(bcrypt.compareSync(password, admin.password))) {
        next(ApiError.badRequest("Wrong Password"));
        return;
    }

    const token = jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET);
    return res
        .header("auth-token", token)
        .json({ token, adminID: admin._id });

}
