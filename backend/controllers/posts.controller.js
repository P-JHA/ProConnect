import User from "../models/user.model.js";
import bcrypt from "bcryptjs";



export const activeCheck = async (req, res) => {
    return res.status(200).json({ message: "RUNNING" });
}


export const createPost = async (req, res) => {
    const { token } = req.body;
    try {

        const user = await User.findOne({ token: token });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newPost = new Post({
            userid: user._id,
            ...req.body,
            body: req.body.body,
            media: req.file ? req.file.path : null,
            fileType: req.file ? req.file.mimetype : null
        });

        await newPost.save();
        return res.status(201).json({ message: "Post created successfully", post: newPost });

    } catch (err) {
        return res.status(500).json({ message: error.message })
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("userid", "name username email profilePicture");
        return res.status(200).json({ posts });
    } catch (err) {
        return res.status(500).json({ message: error.message })
    }
}

export const deletePost = async (req, res) => {

    const { token, postId } = req.body;

    try {
        const user = await User.findOne({ token: token }).select("_id");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const post = await Post.findOne({ _id: postId, userid: user._id });
        if (!post) {
            return res.status(404).json({ message: "Post not found or you are not authorized to delete this post" });
        }

        await Post.deleteOne({ _id: postId });
        return res.status(200).json({ message: "Post deleted successfully" });

    } catch (err) {
        return res.status(500).json({ message: error.message })
    }
}

export const get_comments_by_post = async (req, res) => {
    const { post_id } = req.body;

    try {
        const post = await Comment.findOne({ _id: post_id });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        return res.status(200).json({ comments: post.comments });
    } catch (err) {
        return res.status(500).json({ message: error.message })
    }
}

export const delete_Comment_of_user = async (req, res) => {
    const { token, postId, commentId } = req.body;

    try {
        const user = await User.findOne({ token: token }).select("_id");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const comment = await Comment.findOne({ _id: commentId, postId: postId, userId: user._id });


        if (!comment) {
            return res.status(404).json({ message: "Comment not found or you are not authorized to delete this comment" });
        }

        if (comment.userId.toString() !== user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this comment" });
        }

        await Comment.deleteOne({ _id: commentId });
        return res.status(200).json({ message: "Comment deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: error.message })
    }
}


export const increment_like_count = async (req, res) => {
    const { token, postId } = req.body;

    try {
        const user = await User.findOne({ token: token }).select("_id");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const post = await Post.findOne({ _id: postId });
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.likes.includes(user._id)) {
            return res.status(400).json({ message: "You have already liked this post" });
        }

        post.likes.push(user._id);
        await post.save();

        return res.status(200).json({ message: "Like count incremented successfully", likes: post.likes.length });
    } catch (err) {
        return res.status(500).json({ message: error.message })
    }
}   