import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    body: {
        type: String,
        required: true
    }
});

const workSchema = new mongoose.Schema({
    company: {
        type: String,   
        default: null
    },
    position: {
        type: String,
        default: null
    },
    years: {
        type: String,
        default: null
    }
}); 

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bio: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    currentPosition: {  
        type: String,
        default: ''
    },
    pastWork: {
        type: [workSchema],
        default: []
    },
    education: {
        type: [String],
        default: []
    }

});

const Comment = mongoose.model("Comment", CommentSchema);   

export default Comment;