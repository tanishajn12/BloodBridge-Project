const mongoose = require('mongoose');

const BloodBankSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    location: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        pincode: { type: String, required: true },
        required: true
    },

    contact: {
        phone: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        required: true
    },

    ownedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming the User model stores owner/admin details
        required: true
    },

    ownerDetails: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
        role: { type: String, enum: ['Admin', 'Manager', 'Owner'], default: 'Owner' }
    },

    operatingHours: {
        openingTime: { type: String, required: true },  // e.g., "08:00 AM"
        closingTime: { type: String, required: true }   
    },

    bloodDirectory: {
        A_positive: { type: Number, default: 0 },
        A_negative: { type: Number, default: 0 },
        B_positive: { type: Number, default: 0 },
        B_negative: { type: Number, default: 0 },
        AB_positive: { type: Number, default: 0 },
        AB_negative: { type: Number, default: 0 },
        O_positive: { type: Number, default: 0 },
        O_negative: { type: Number, default: 0 },
        required: true
    },
    donors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Donor'
        }
    ],

    events: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Bloodbank', bloodBankSchema);
