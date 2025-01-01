const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//@desc post register 
//@route post /api/user/register 
//@access public
const registerUser = (async (req,res) => {
    try {
        // extract user information from our request body
        const {username,email,password,role} = req.body;


        // if the user already exists 
        const checkingExistingUser = await User.findOne({$or : [{username},{email}]})
        if(checkingExistingUser){
            return res.status(400).json({
                success : false,
                message : 'user is already exists with same username or email',
            });
        }
        //hash the password of user 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        // create a new user and save in database 
        const newlyCreatedUser = new User ({
            username,
            email,
            password:hashedPassword,
            role : role || 'user'
        });

        await newlyCreatedUser.save();

        if(newlyCreatedUser){
            res.status(201).json({
                success: true,
                message:'User registered successfully!'
            })
        } else {
            res.status(400).json({
                success: false,
                message:'User registered failed! Please try again'
            })
        }
    } catch (error) {
        console.error(error);  // Log the error
        res.status(500).json({
            success: false,
            message: 'Server error, please try again later',
        });
    }
})


// //@desc post login
// //@route post /api/user/login 
// //@access public

const loginUser = async (req,res) => {
    try {
    // extract user name and password from req.body
    const {username,password} = req.body;
    // checking the details exists in db or not
    const user = await User.findOne({username});

    if(!user) {
        return res.status(400).json({
            success:false,
            message:"User don't exists"
        })
    }

    // if the password is correct or not 
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if(!isPasswordMatch){
    return res.status(400).json({
        success:false,
        message:'Invalid details'
    })
  }

  // create user tokens 
  const accessToken = jwt.sign({     // creates a access tokens in encrypted forms 
    userId : user._id,
    username : user.username,
    role : user.role
  },process.env.JWT_SECRET_KEY,{
    expiresIn : '15m'        // expires JWT in 15 mins
  })

  res.status(200).json({            // returning the token back
    success: true,
    message:'Logged in successfully',
    accessToken
  })
        
    } catch (error) {
        console.error(error);      // Log the error
        res.status(500).json({
            success: false,
            message: 'Server error, please try again later',
        });
    }

};

const changePassword = async (req,res) => {
    try {
        const userId = req.userInfo.userId;

        // extract old and new password 
        const {oldPassword , newPassword} = req.body;                  // check from frontend that old and new passwords are not same 

        // find  the logged in user 
        const user = await User.findById(userId);

        // check if the user exists in database collections 

        if(!user){
            return res.status(400).json({
                success : false,
                message : 'User Not Found!'
            })
        }


        // checking if the old password is correct 
        const isPasswordMatch = await bcrypt.compare(oldPassword,user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                success : false,message : 'Old Password is not correct! Please try again!'
            })
        };

        // hash the new password 

        const salt = await bcrypt.genSalt(10);
        const newHashedPassword = await bcrypt.hash(newPassword, salt);


        // update the user password 
        user.password = newHashedPassword
        await user.save();


        return res.status(200).json({
            success:true ,
            message : 'Password Changed Successfully!'
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Some Error Occured! Please Try Again",
        });
        
    }

}



module.exports = {registerUser,loginUser,changePassword}