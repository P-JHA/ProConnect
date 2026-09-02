import User from "../models/user.model.js";
import bcrypt from "bcryptjs";



export const activeCheck = async (req, res) => {
    return res.status(200).json({ message: "RUNNING" });
}


