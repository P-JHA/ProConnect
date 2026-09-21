import { Router } from "express";
import multer from "multer";
import { downloadProfile, getUserAndProfile } from "../controllers/user.controller.js";

import {
    register,
    login,
    updateUserProfile,
    uploadProfilePicture,
} from "../controllers/user.controller.js";

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

router.route("/upload_profile_picture").post(upload.single("profile_Picture"), uploadProfilePicture)

// Routes
router.route("/register").post(register);
router.route("/login").post(login)
router.route("/user_update").post(updateUserProfile)
router.route("/get_user_and_profile").get(getUserAndProfile)
router.route("/update_profile_data").post(updateProfileData)
router.route("/get_all_user_profiles").get(getAllUserProfile)
router.route ("/user/download_resume").get(downloadProfile);
router.route ("/user/send_connection_request").post(sendConnectionRequest);
router.route ("/user/get_connection_requests").get(getMyConnectionsRequests);
router.route ("/user/accept_connection_request").get(acceptConnectionRequest);
router.route ("/user/accept_connection_request").post(acceptUserConnectionRequest);




export default router;