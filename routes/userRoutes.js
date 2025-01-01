const express = require("express");
const { registerUser, loginUser,changePassword } = require("../controller/userController");
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')

router.post("/register",registerUser);

router.post("/login",loginUser);

router.post("/change-password",authMiddleware,changePassword);

// router.get("/current",currentUser);

module.exports = router