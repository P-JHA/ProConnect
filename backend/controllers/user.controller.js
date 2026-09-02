import Profile from "../models/profile.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import pdfDocument from "pdfkit";
import fs from "fs";



const convertUserDataToPDF = async (userData) => {
    const doc = new pdfDocument();

    const outputPath = crypto.randomBytes(16).toString("hex") + ".pdf";
    const stream = fs.createWriteStream("uploads /" + outputPath);
    doc.pipe(stream);

    doc.image(`uploads/${userData.userId.profilePicture}`, {
        fit: [150, 150],
        align: "center",
        valign: "center",
    });
    doc.fontSize(14).text(`Name: ${userData.userId.name}`, { align: "left" });
    doc.fontSize(14).text(`Username: ${userData.userId.username}`, { align: "left" });
    doc.fontSize(14).text(`Email: ${userData.userId.email}`, { align: "left" });
    doc.fontSize(14).text(`Bio: ${userData.bio}`, { align: "left" });
    doc.fontSize(14).text(`Skills: ${userData.skills.join(", ")}`, { align: "left" });
    doc.fontSize(14).text(`currentPosition: ${userData.currentPosition}`, { align: "left" });
    doc.fontSize(14).text(`Experience: ${userData.experience}`, { align: "left" });
    doc.fontSize(14).text(`Education: ${userData.education}`, { align: "left" });
    doc.fontSize(14).text("pastWork: ")
    user.Data.pastwork.forEach((work, index) => {
        doc.fontSize(14).text(`Company Name: ${work.companyName}`);
        doc.fontSize(14).text(`Position: ${work.position}`);
        doc.fontSize(14).text(`Years: ${work.years}`);
    });
    doc.end();
    return outputPath;
}


export const register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        if (!name || !username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const profile = new Profile({
            userId: newUser._id,
        });

        await profile.save();

        await profile.save();
        return res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        const token = crypto.randomBytes(32).toString("hex");

        await User.updateOne({ _id: user._id }, { token });
        return res.token(200).json({ message: "Login successful", token });
    } catch (err) {

    }
}

export const uploadProfilePicture = async (req, res) => {
    const token = req.body;

    try {
        const user = await User.findOne({ token: token });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.profilePicture = req.file.filename;
        await user.save();
        return res.status(200).json({ message: "Profile picture uploaded successfully" });



    } catch (err) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateUserProfile = async (req, res) => {
    try {
        const { token, ...updateData } = req.body;
        const user = await User.findOne({ token: token });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const { username, email } = newUserData;


        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            if (existingUser || String(existingUser._id) !== user._id) {
                return res.status(400).json({ message: "User already exists" });
            }
        }

        object.assign(user, updateData);
        await user.save();
        return res.status(200).json({ message: "User profile updated successfully" });
    } catch (err) {
        return res.status(500).json({ message: error.message })
    }
}


export const getUserAndProfile = async (req, res) => {
    try {
        const { token } = req.body;
        const user = await User.findOne({ token: token });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const userProfile = await Profile.findOne({ userId: user._id })
            .populate("userId", "name username email profilePicture");
        return res.status(200).json({ userProfile });
    } catch (err) {
        return res.status(500).json({ message: error.message })
    }

}

export const updateProfileData = async (req, res) => {
    try {
        const { token, ...updateData } = req.body;
        const userProfile = await User.findOne({ token: token });
        if (!userProfile) {
            return res.status(404).json({ message: "User profile not found" });
        }
        const profile_to_update = await Profile.findOne({ userId: userProfile._id });
        Object.assign(profile_to_update, newProfileData);
        await profile_to_update.save();
        return res.status(200).json({ message: "User profile updated successfully" });
    } catch (err) {
        return res.status(500).json({ message: error.message })
    }
}

export const getAllUserProfile = async (req, res) => {
    try {
        const Profiles = await Profile.find()
            .populate("userId", "name username email profilePicture");
        return res.status(200).json({ Profiles });
    } catch (err) {
        return res.status(500).json({ message: error.message })
    }
}

export const downloadProfile = async (req, res) => {
    try {
        const user_id = req.query.id;
        const userProfile = await Profile.findOne({ _id: user_id }).populate("userId", "name username email profilePicture");

        let outputPath = await convertUserDataToPDF(userProfile);
        return res.json({ "message": outputPath });
    }
}

export const sendConnectionRequest = async (req, res) => {
    const { token, connectionId } = req.body;

    try {
        const user = await User.findOne({ token: token });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const connectionUser = await User.findById(connectionId);
        if (!connectionUser) {
            return res.status(404).json({ message: "Connection user not found" });
        }

        const existingRequest = await connectionRequest.findOne({ from: user._id, to: connectionUser._id });
        if (existingRequest) {
            return res.status(400).json({ message: "Connection request already sent" });
        }

        const newRequest = new connectionRequest({
            from: user._id,
            to: connectionUser._id,
        });
        await newRequest.save();
        return res.status(200).json({ message: "Connection request sent successfully" });
    } catch (err) {
        return res.status(500).json({ message: error.message })
    }
}

export const getMyConnectionsRequests = async (req, res) => {
    const { token } = req.body;

    try {
        const user = await User.findOne({ token: token });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const connections = await connectionRequest.find({ userId: user._id })
            .populate('connectionId', 'name username email profilePicture');

            return res.status(200).json({ connections });


    } catch (err) {
        return res.status(500).json({ message: error.message });
    }
};

export const acceptConnectionRequest = async (req, res) => {
    const { token, requestId } = req.body;

    try {
        const user = await User.findOne({ token: token });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const connections = await connectionRequest.find({ connectionId: user._id })
        .populate('userId', 'name username email profilePicture');

        return res.status(200).json( connections );
        
    } catch (err) {
        return res.status(500).json({ message: error.message });
    }
};

export const acceptConnectionRequest = async (req, res) => {
    const { token, requestId, action_type } = req.body;

    try {
        const user = await User.findOne({ token: token });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        const connection = await connectionRequest.findOne({ _id: requestId });

        if (!connection) {
            return res.status(404).json({ message: "Connection request not found" });
        }
        
        if (action_type === "accept") {
           connection.status_accepted = true;
        }else{
            connection.status_accepted = false;
        }

        await connection.save();
        return res.status(200).json({ message: "Connection request updated successfully" });
       

    } catch (err) {
        return res.status(500).json({ message: error.message });
    }
}