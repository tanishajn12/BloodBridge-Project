//ngo, college society, eg rotaract
const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    type: {
        type: String,
        enum: ['Hospital', 'NGO', 'Corporate', 'College Society'],
        required: true
    },

    events: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],

    contact: {
        phone: { type: String, required: true },
        email: { type: String, required: true, unique: true }
    },

    address: {
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        pincode: { type: String, required: true }
    },

    registeredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Links to the user who registered this organization
        required: true
    },


    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Organization', organizationSchema);
