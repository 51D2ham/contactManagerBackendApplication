const jwt = require("jsonwebtoken") // decode the token 



const authMiddleware = (req,res,next) => {
   
    // header 

    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    // hold the bearer token with a space
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access denied . No Token Provided. Please login to continue....'
        });
    }

    // decode the token 

    try {
       const decodeTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY) 
       console.log(decodeTokenInfo)

       req.userInfo = decodeTokenInfo;
       next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Access denied . No Token Provided. Please login to continue....'
        });
    }

    
}



module.exports = authMiddleware