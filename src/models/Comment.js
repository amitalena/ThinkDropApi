const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    parentCommentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    replies: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            replyComment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true },
            createdAt: { type: Date, default: Date.now },
        }
    ]
});

module.exports = mongoose.model('Comment', commentSchema);