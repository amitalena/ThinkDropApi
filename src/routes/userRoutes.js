const express = require('express')
const upload = require('../middleware/profileMiddleware');
const validateToken = require('../utils/protectToken');
const { signUp, login, profile } = require('../controllers/userController');
const router = express.Router();

router.post("/signup", upload.single("profileImage"), signUp);
router.post("/login", login);
router.get("/profile", validateToken, profile);

module.exports = router;
