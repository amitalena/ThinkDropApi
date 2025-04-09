const Blog = require("../models/Blog");
const Comment = require("../models/Comment");

// comment add blog
exports.addCommentToBlog = async (req, res) => {
    const userId = req.user?.id;
    try {
        const { blogId } = req.params;
        const { content } = req.body;

        if (!content || !content.trim()) {
            return res.status(400).json({ success: false, message: 'Comment content is required' });
        }

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        const newComment = await Comment.create({
            content: content.trim(),
            blogId,
            userId: userId
        });

        res.status(201).json({
            success: true,
            message: 'Comment added successfully',
            comment: newComment
        });

    } catch (error) {
        console.error('Error adding comment:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to add comment',
            error: error.message
        });
    }
};
// comment reply
exports.replyToComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { replyCommentId } = req.body;

        const originalComment = await Comment.findById(commentId);
        if (!originalComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        const replyData = {
            userId: req.user?.id,
            replyComment: replyCommentId,
            createdAt: new Date()
        };

        originalComment.replies.push(replyData);

        await originalComment.save();

        res.status(200).json({ message: 'Reply added successfully', comment: originalComment });
    } catch (error) {
        res.status(500).json({ message: 'Failed to reply to comment', error: error.message });
    }
};

// all comments
exports.getBlogComments = async (req, res) => {
    try {
        const { blogId } = req.params;

        const comments = await Comment.find({ blogId })
            .populate('userId', 'name email')
            .populate({
                path: 'replies.userId',
                select: 'name email'
            })
            .populate({
                path: 'replies.replyComment',
                populate: {
                    path: 'userId',
                    select: 'name email'
                }
            })
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, comments });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch comments',
            error: error.message
        });
    }
};

