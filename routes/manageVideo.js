const express = require('express');
const router = express.Router();
const fetchAdmin = require('../middleware/fetchAdmin')
const youtube = require("youtube-metadata-from-url");
const Video = require('../models/Video');


// Route 1 : POST upload a youtube video to the db "api/video/create"

router.post('/create', fetchAdmin, (req, res) => {

    const { url } = req.body;
    youtube.metadata(url).then(async function (json) {
        const video = await Video({
            videoLink: json.html,
            imageLink: json.thumbnail_url,
            title: json.title,
            authorName: json.author_name,
            providerName: json.provider_name,
            authorUrl: json.author_url,
            url: url
        })
        const savedVideo = await video.save()
        res.status(200).json({ "success": "video saved successfully" })
    }, function (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error')
    });

})

// ROUTE 2: get video : GET '/api/video/fetch' require auth


router.get('/fetch', async (req, res) => {
    try {
        const video = await Video.find().sort({ _id: -1 });
        res.json(video)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error')
    }
})


// ROUTE 4: Delete an existing video using: DELETE "/api/video/delete/:id". Login required


router.delete('/delete/:id', fetchAdmin, async (req, res) => {
    try {
        let video = await Video.findById(req.params.id);
        if (!video) { return res.status(404).send('Not Found') }

        video = await Video.findByIdAndDelete(req.params.id)

        res.status(200).json({ "success": "Video Deleted" })

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error')
    }
})


module.exports = router;
