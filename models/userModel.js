const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required:[true,"Please add the user name"],
        unique: true,
        trim : true
    },
    email: {
        type: String,
        required:[true,"Please add the user email address"],
        unique:[true,"Email address already taken"],
        trim: true,
    },
    password: {
        type: String,
        required:[true,"Please add the user password"]
    }, 
    role :{
        type: String,
        enum : ['user','admin'],
        default: 'user'
    }
},
{
    timestamps:true,
}
);

module.exports = mongoose.model("User",userSchema);