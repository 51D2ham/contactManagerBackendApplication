const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// to check admin role based access 
// needs both login and role based validations 

router.get('/welcome',authMiddleware,adminMiddleware,(req,res) => {
    res.json({
        message : "Welcome to the admin page"
    })
})


module.exports = router