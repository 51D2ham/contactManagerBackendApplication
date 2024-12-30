const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");


//@desc post register 
//@route post /api/user/register 
//@access public
const registerUser = asyncHandler(async (req,res) => {
    res.json({message:"register the user"})
})


// //@desc post login
// //@route post /api/user/login 
// //@access public
const loginUser = asyncHandler(async (req,res) => {
    res.json({message:"login the user"})
})

// //@desc get current 
// //@route get/api/user/current
// //@access private 
const currentUser = asyncHandler(async (req,res) => {
    res.json({message:"Current user info "})
})

module.exports = {registerUser,loginUser,currentUser}


