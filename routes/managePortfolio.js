const express = require('express');
const router = express.Router();
const fetchAdmin = require('../middleware/fetchAdmin');
const Portfolio = require('../models/Portfolio');

router.post('/create', fetchAdmin, (req, res) => {
    try {
        const portfolio = Portfolio(req.body);
        portfolio.save();

        console.log(req.body);

        res.status(200).send("portfolio created successfully");

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error')
    }
});



router.put('/update/:id', fetchAdmin, async (req, res) => {

    const { imageURL, type, title, github, hostedLink } = req.body;

    try {

        const updatePortfolio = {}

        if (imageURL) { updatePortfolio.imageURL = imageURL };
        if (type) { updatePortfolio.type = type };
        if (github) { updatePortfolio.github = github };
        if (title) { updatePortfolio.title = title };
        if (hostedLink) { updatePortfolio.hostedLink = hostedLink };

        portfolio = await Portfolio.findByIdAndUpdate(req.params.id, { $set: updatePortfolio }, { new: true })

        console.log(updatePortfolio);
        // res.json({ updatePortfolio });

        res.status(200).send("portfolio updated successfully");

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error')
    }
});

router.get('/fetch', async (req, res) => {

    try {

        const portfolio = await Portfolio.find().sort({ _id: -1 });
        res.json(portfolio)

    } catch (error) {

        console.log(error.message);
        res.status(500).send('Internal Server Error')

    }

});

router.delete('/delete/:id', async (req, res) => {
    try {

        let portfolio = await Portfolio.findById(req.params.id);
        if (!portfolio) { return res.status(404).send('Not Found') }

        portfolio = await Portfolio.findByIdAndDelete(req.params.id)

        res.json({ "Success": "portfolio Deleted" })

    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router;