// routes/preferences.js
const express = require('express');
const router = express.Router();
const Preference = require('../model/Preference');
const Mailer = require('../mailer.js');

router.post('/', async (req, res) => {
    try {
        const preference = new Preference(req.body);
        const data = {
            name: req.body.name
        };
        Mailer.send(req.body.email, 'Thanks for connecting me with us', 'form-submit-reply-saas-tile', data);
        await preference.save();
        res.status(201).json({ message: 'Form submitted successfully' });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Error saving form data' });
    }
});
router.get('/', async (req, res) => {
    try {
        const preferences = await Preference.find().sort({ createdAt: -1 }); // Latest first
        res.json(preferences);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching form data' });
    }
});
module.exports = router;
