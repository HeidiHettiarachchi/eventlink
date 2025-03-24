const mongoose = require("mongoose");
const eventRegForm = require("../models/eventModel");

// Get all event registration forms
const getEventRegs = async (req, res) => {
    try {
        const eventRegs = await eventRegForm.find({}).sort({ createdAt: -1 });
        res.status(200).json(eventRegs);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get a single event registration form by ID
const getEventReg = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid event registration form ID" });
    }

    try {
        const eventReg = await eventRegForm.findById(id);
        if (!eventReg) {
            return res.status(404).json({ error: "Event registration form not found" });
        }
        res.status(200).json(eventReg);
    } catch (error) {
        res.status(500).json({ error: "Error fetching event registration form" });
    }
};

// Create event registration form
const createEvent = async (req, res) => {
    const eventID = req.body.eventID || new mongoose.Types.ObjectId(); // Generate ID if missing

    const {
        eventName,
        eventDate,
        eventStartTime,
        eventFinishTime,
        timePeriod,
        eventPresident,
        eventProposal,
        eventForm,
        eventMode,
        eventType,
        eventStatus
    } = req.body;

    try {
        const form = await eventRegForm.create({
            eventID, // Now included
            eventName,
            eventDate,
            eventStartTime,
            eventFinishTime,
            timePeriod,
            eventPresident,
            eventProposal,
            eventForm,
            eventMode,
            eventType,
            eventStatus
        });

        res.status(201).json(form);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete event registration form
const deleteEventReg = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid event registration form ID" });
    }

    try {
        const form = await eventRegForm.findByIdAndDelete(id);
        if (!form) {
            return res.status(404).json({ error: "Event registration form not found" });
        }

        res.status(200).json({ message: "Event registration form deleted successfully", form });
    } catch (error) {
        res.status(500).json({ error: "Error deleting event registration form" });
    }
};

// Update event registration form
const updateEventReg = async (req, res) => {
    const { id } = req.params; // Fixed typo

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid event registration form ID" });
    }

    try {
        const form = await eventRegForm.findByIdAndUpdate(id, req.body, { new: true });
        if (!form) {
            return res.status(404).json({ error: "Event registration form not found" });
        }

        res.status(200).json(form);
    } catch (error) {
        res.status(500).json({ error: "Error updating event registration form" });
    }
};

// Get event registration listings by eventID
/*const getEventRegListings = async (req, res) => {
    const eventID = req.body.eventID || new mongoose.Types.ObjectId(); // Generate ID if missing

    try {
        if (!eventID) {
            return res.status(400).json({ error: "Invalid Event ID" });
        }

        const eventReg = await eventRegForm.find({ eventID }); // Fixed field name

        res.status(200).json(eventReg);
    } catch (error) {
        res.status(500).json({ error: "Error fetching event registration listings" });
    }
};*/

module.exports = {
    getEventReg,
    //getEventRegListings,
    getEventRegs,
    createEvent,
    updateEventReg,
    deleteEventReg
};
