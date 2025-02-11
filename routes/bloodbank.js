const express = require("express");
const Bloodbank = require("../models/Bloodbank");
const { isLoggedIn, isAdmin, validateBloodbank } = require("../middleware");
const router = express.Router();

// Get all blood banks
router.get("/bloodbanks", async (req, res) => {
    try {
        const bloodbanks = await Bloodbank.find({});
        res.render("bloodbanks/index", { bloodbanks });
    } catch (e) {
        res.render("error", { err: e.message });
    }
});

// New blood bank form
router.get("/bloodbank/new", isLoggedIn, isAdmin, (req, res) => {
    try {
        res.render("bloodbanks/new");
    } catch (e) {
        res.render("error", { err: e.message });
    }
});

// Add new blood bank
router.post("/bloodbanks", isLoggedIn, isAdmin, validateBloodbank, async (req, res) => {
    try {
        const { 
            name, 
            location: { address, city, state, country, pincode }, 
            contact: { phone, email }, 
            ownerDetails: { name: ownerName, phone: ownerPhone, email: ownerEmail, role }, 
            operatingHours: { openingTime, closingTime }, 
            bloodDirectory 
        } = req.body;
        

        await Bloodbank.create({ name, location, contact, availableBloodTypes });

        req.flash("success", "Blood Bank Added Successfully");
        res.redirect("/bloodbanks");
    } catch (e) {
        res.render("error", { err: e.message });
    }
});

// Show particular blood bank
router.get("/bloodbanks/:id", isLoggedIn, async (req, res) => {
    try {
        const { id } = req.params;
        const bloodbank = await Bloodbank.findById(id);
        res.render("bloodbanks/show", { bloodbank });
    } catch (e) {
        res.render("error", { err: e.message });
    }
});

// Edit blood bank form
router.get("/bloodbanks/:id/edit", isLoggedIn, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const bloodbank = await Bloodbank.findById(id);
        res.render("bloodbanks/edit", { bloodbank });
    } catch (e) {
        res.render("error", { err: e.message });
    }
});

// Update blood bank
router.patch("/bloodbanks/:id", isLoggedIn, isAdmin, validateBloodbank, async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            name, 
            location: { address, city, state, country, pincode }, 
            contact: { phone, email }, 
            ownerDetails: { name: ownerName, phone: ownerPhone, email: ownerEmail, role }, 
            operatingHours: { openingTime, closingTime }, 
            bloodDirectory 
        } = req.body;
        

        await Bloodbank.findByIdAndUpdate(id, { name, location, contact, availableBloodTypes });

        req.flash("success", "Blood Bank Updated Successfully");
        res.redirect(`/bloodbanks/${id}`);
    } catch (e) {
        res.render("error", { err: e.message });
    }
});

// Delete blood bank
router.delete("/bloodbanks/:id", isLoggedIn, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        await Bloodbank.findByIdAndDelete(id);

        req.flash("success", "Blood Bank Deleted Successfully");
        res.redirect("/bloodbanks");
    } catch (e) {
        res.render("error", { err: e.message });
    }
});

module.exports = router;
