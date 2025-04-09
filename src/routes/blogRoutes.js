const express = require('express');

const { createBlog, allBlog, singleBlog, updatedBlog, deleteBlog } = require('../controllers/blogController');
const validateToken = require('../utils/protectToken');
const upload = require('../middleware/blogMiddleware');

const router = express.Router();

router.post('/create', validateToken, upload.single('blogImage'), createBlog);
router.get('/all', allBlog);
router.get("/:id", singleBlog);
router.put("/:id", upload.single('blogImage'), updatedBlog);
router.delete("/:id", deleteBlog);

module.exports = router;
