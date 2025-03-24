const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventRegSchema = new Schema ({

    eventID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true

    },

    eventName: {
        type: String,
        required: true
    },

    eventDate: {
        type: String,
        required: true

    },

    eventStartTime: {
        type: String, 
        required: true

    },

    eventFinishTime: {
        type: String, 
        required: true
    },

    timePeriod: {
        type: String, 
        required: true
    },

    eventPresident: {
        type: String, 
        required: true

    },

    eventProposal: {
        type: String, //picture download type
        required: true
    },

    eventForm: {
        type: String, //picture download type
        required: true
    },

    eventMode: {
        type: String, 
        enum: ['Physical', 'Online'], 
        required: true

    },

    eventType: {
        type: String, 
        enum: ['Hackathon', 'Academic', 'Non-Academic'],
        required: true
    },

    eventStatus: {
        type: String, 
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending',
        required: true
    }
})

const eventRegForm = mongoose.model('eventRegForm',eventRegSchema );

module.exports = eventRegForm;