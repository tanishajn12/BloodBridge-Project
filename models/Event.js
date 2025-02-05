const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        startTime: { type: String, required: true }, 
        endTime: { type: String, required: true }   
    },

    location: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        pincode: { type: String, required: true }
    },
    bloodBank: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bloodbank',
        required: true // each event is linked to a blood bank
    },

    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        default: null  //not necessary
    },

    coordinators: [
        {
            name: { type: String, required: true },
            phone: { type: String, required: true },
            email: { type: String, required: true }
        }
    ],

    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Donor' // List of donors who have registered for the event
        }
    ],

    status: {
        type: String,
        enum: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'],
        default: 'Upcoming'
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Event', EventSchema);
