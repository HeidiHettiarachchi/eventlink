const express = require("express");

const {
    getEventReg,
    //getEventRegListings,
    getEventRegs,
    createEvent,
    updateEventReg,
    deleteEventReg
} = require("../controllers/eventController");

const router = express.Router();

// Get ALL forms 
router.get("/", getEventRegs);

// Get a specific form by ID
router.get("/:id", getEventReg);  

// Get user-specific forms
//router.get("/getUser", getEventRegListings);

// Create a new form
router.post("/", createEvent);

// Delete a form (✅ FIXED: Added `/` before `:id`)
router.delete("/:id", deleteEventReg);  

// Update a form (✅ FIXED: Added `/` before `:id`)
router.patch("/:id", updateEventReg);

module.exports = router;
