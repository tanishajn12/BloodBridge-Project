const express =  require("express");
const Event = require('../models/Event');
const Bloodbank = require('../models/Bloodbank')
const router = express.Router();

// Get all bloodbanks
router.get("/", async (req, res) => {
    try {
        let bloddbanks = await Bloodbank.find({});
        let events = await Event.find({});
        res.render("home", { bloodbanks , events});
    } 
    
    catch (e) {
        res.render('error', { err: e.message });
    }
});
module.exports = router;