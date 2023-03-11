const express = require('express');
const BlogAnalytics = require('../models/BlogAnalytics');
const router = express.Router();
const VisitAnalytics = require('../models/VisitAnalytics')
const WatchAnalytics = require('../models/WatchAnalytics')

router.post("/createVisit", async (req, res) => {

    try {
        const visit = VisitAnalytics(req.body);
        visit.save();

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

// 

router.post("/createBlogAnalytics", async (req, res) => {

    try {
        const blogVisit = BlogAnalytics(req.body);
        blogVisit.save();

        res.status(200).send("stats generated succesfully");
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error')
    }

})

router.get('/fetchBlogAnalytics', async (req, res) => {
    try {
        const blogVisit = await BlogAnalytics.find();
        res.json(blogVisit)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error')
    }
})


//

router.post("/createWatchAnalytics", async (req, res) => {

    try {
        const watch = WatchAnalytics(req.body)
        watch.save();

        res.status(200).send("stats generated succesfully");
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error')
    }

})


router.get('/fetchWatchAnalytics', async (req, res) => {
    try {
        const watch = await WatchAnalytics.find();
        res.json(watch)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error')
    }
})


module.exports = router;