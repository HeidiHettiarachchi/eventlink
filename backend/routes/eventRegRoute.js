const express = require("express");
const { authenticationUtil } = require("../utils");
const {
    createEvent,
    getEvents,
    updateEventStatus,
    updateEvent,
    deleteEvent,
} = require("../controllers/eventController");

const eventRegRouter = express.Router();

// Middleware to authenticate the user
eventRegRouter.post("/createEvent", authenticationUtil, createEvent);
eventRegRouter.get("/getEvents", authenticationUtil, getEvents);        
eventRegRouter.put("/updateEventStatus/:id", authenticationUtil, updateEventStatus);
eventRegRouter.put("/updateEvent/:id", authenticationUtil, updateEvent);
eventRegRouter.delete("/deleteEvent/:id", authenticationUtil, deleteEvent);


// Add event
eventRegRouter.post("/addEvent", authenticationUtil, createEvent);  

//Update and remove event
eventRegRouter.put("/updateEvent/:id", authenticationUtil, updateEvent);
eventRegRouter.delete("/removeEvent/:id", authenticationUtil, deleteEvent);

module.exports = eventRegRouter;