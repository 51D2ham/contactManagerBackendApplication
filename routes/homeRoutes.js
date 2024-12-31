const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')

// just to check the protected paths 
router.get ('/welcome', authMiddleware,(req,res) => {
    const {username,userId,role} = req.userInfo;
    res.json({
        message: 'Welcome to the Home Page',
        user:{
            _id: userId,
            username,
            role,
        }
    })
});

module.exports = router