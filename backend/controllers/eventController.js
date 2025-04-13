const eventRegForm = require("../models/eventModel");

const createEvent = async (req, res) => {

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

    }=req.body;

    try{
        const eventCreate = new eventRegForm({
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
        await eventCreate.save();
        res.status(201).json({ message: "Event created successfully", eventCreate });
    }catch(err){
        res.status(500).json({ message: "Failed to create event", error: err.message });
    }
};

const getEvents = async (req, res) => {
  try {
    const events = await eventRegForm.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch events", error: err.message });
  }
};

const updateEventStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const event = await eventRegForm.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        event.status = status;
        await event.save();
        res.status(200).json({ message: "Event status updated successfully", event });
    } catch (err) {
        res.status(500).json({ message: "Failed to update event status", error: err.message });
    }
};

const updateEvent = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const event = await eventRegForm.findByIdAndUpdate(id, updatedData, { new: true});
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json({ message: "Event updated successfully", event });
    } catch (err) {
        res.status(500).json({ message: "Failed to update event", error: err.message });
    }
};

const deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEvent = await eventRegForm.findByIdAndDelete(id);
        if (!deletedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete event", error: err.message });
    }
};

module.exports = {
    createEvent,
    getEvents,
    updateEventStatus,
    updateEvent,
    deleteEvent
};

