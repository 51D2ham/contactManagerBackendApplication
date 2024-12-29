const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel")



//@desc Get all Contacts 
//@route GET /api/contact
//@access public 

const getContacts = asyncHandler(async(req,res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);                   // wrap with asynchandler in (async) to avoid try and caught case 
});


//@desc create New Contacts 
//@route post /api/contact
//@access public 

const createContact = asyncHandler(async (req,res) => {
    // console.log("the request body is:",req.body);
    const {name,email,phone} = req.body;
    if(!name ||!email ||!phone ) {
        res.status(400);
        throw new Error ("All fields are mandatory")       // sends error data in html format , for json create a custom middleware 
    }
    const contact = await Contact.create({
        name,email,phone,
    });

    res.status(201).json(contact);   //201 as resource created
});

//@desc get single Contacts 
//@route get/api/contact/:id
//@access public 

const getContact = asyncHandler(async (req,res) => {        // single contact
   const contact = await Contact.findById(req.params.id)
   if (!contact){
    res.status(404);
    throw new Error("Contact Not Found");
   }
    res.status(200).json(contact);
});

//@desc Update  Contacts/:id    // first need to fetch the contacts 
//@route put /api/contact
//@access public    

const updateContact = asyncHandler (async (req,res) => {
// first have to fetch the contacts
const contact = await Contact.findById(req.params.id)
if (!contact){
 res.status(404);
 throw new Error("Contact Not Found");
}

// now update it after fetching the contacts

const updatedContact = await Contact.findByIdAndUpdate(
req.params.id,        // id which have to update
req.body,              // body that have to update 
{new:true}
);
res.status(200).json({message:"Contact Updated Successfully",contact});
});


//@desc delete Contact/:id
//@route put /api/contact
//@access public 
const deleteContact = asyncHandler (async(req,res) => {
    // first fetch the contacts 
    const contact = await Contact.findById(req.params.id);

if (!contact){
 res.status(404);
 throw new Error("Contact Not Found");
}
// now delete it 
// await Contact.remove();
await Contact.findByIdAndDelete(req.params.id);

res.status(200).json({message:"Contact Deleted Successfully",contact});
});




module.exports = {getContacts, createContact,updateContact,getContact,deleteContact}