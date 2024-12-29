const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true,"Please add the contact Name"],
    },
    email: {
        type: String,
        required: [false,"Please add the contact Email"],
    },
    phone: {
        type: String,
        required: [true,"Please add the contact Phone"],
    },
},
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("contact",contactSchema)