const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

//------------------< AUTHORIZATION TOKEN VALIDATION >------------------//
const validateToken = asyncHandler(async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access Denied! No token provided", status: false });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.user = decoded.user;
        next();
    } catch (error) {
        console.error("Token validation error:", error.message);
        return res.status(401).json({ message: "Invalid or expired token", status: false });
    }
});

module.exports = validateToken;
