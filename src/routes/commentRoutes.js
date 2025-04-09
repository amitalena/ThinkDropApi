const express = require('express');
const validateToken = require('../utils/protectToken');
const { replyToComment, getBlogComments, addCommentToBlog } = require('../controllers/commentController');
const router = express.Router();

router.post('/:blogId/comments', validateToken, addCommentToBlog);
router.post('/:commentId/reply', validateToken, replyToComment);
router.get('/:blogId/comments', getBlogComments);

module.exports = router;
