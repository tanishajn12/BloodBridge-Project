const mongoose = require('mongoose');

const DonorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bloodType: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        required: true
    },

    lastDonationDate: {
        type: Date,
        default: null
    },

    donationHistory: [
        {
            bloodBank: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Bloodbank'
            },
            date: { type: Date, required: true },
            quantity: { type: Number, required: true } // Quantity in mL
        }
    ],

    medicalHistory: {
        diseases: { type: [String], default: [] }, // E.g., ["Diabetes", "Hypertension"]
        medications: { type: [String], default: [] }, // E.g., ["Aspirin", "Insulin"]
        lastMedicalCheckup: { type: Date, default: null }
    },

    eligibilityStatus: {
        type: Boolean,
        default: true 
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Donor', donorSchema);
