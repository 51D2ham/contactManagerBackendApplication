const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const { getContacts, createContact, getContact, updateContact, deleteContact} = require ("../controller/contactController")

router.route('/')
.get(authMiddleware,getContacts)
.post(authMiddleware,createContact)

router.route('/:id')
.get(authMiddleware,getContact)
.put(authMiddleware,updateContact)
.delete(authMiddleware,deleteContact)

module.exports = router;