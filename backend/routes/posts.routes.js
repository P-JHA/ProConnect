import {Router} from "express";
import {activecheck} from "../controllers/posts.controller.js";
import multer from "multer";
import {createPost, getAllPosts} from "../controllers/posts.controller.js";

const router = Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage : storage });

router.route("/").get(activecheck);


router.route("/post").post(upload.single("media"), createPost);
router.route("/[posts").get(getAllPosts);

export default router;