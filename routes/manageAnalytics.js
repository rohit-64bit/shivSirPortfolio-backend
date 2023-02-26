const express = require('express');
const router = express.Router();
const VisitAnalytics = require('../models/VisitAnalytics')

router.post("/createVisit", async (req, res) => {

    try {
        const blog = VisitAnalytics(req.body);
        blog.save();

        console.log(req.body);

        res.status(200).send("stats generated succesfully");
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error')
    }

})

router.get('/fetchVisit', async (req, res) => {
    try {
        const visit = await VisitAnalytics.find();
        res.json(visit)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error')
    }
})

module.exports = router;