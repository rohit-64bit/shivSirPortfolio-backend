const express = require('express');
const router = express.Router();
const fetchAdmin = require('../middleware/fetchAdmin')
const Blog = require('../models/Blog');

// Route 1 : /api/blog/create

router.post('/create', fetchAdmin, (req, res) => {
    try {
        const blog = Blog(req.body);
        blog.save();

        console.log(req.body);

        res.status(200).send("blog created successfully");

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error')
    }
});



router.put('/update/:id', fetchAdmin, async (req, res) => {

    const { imageUrl, description, tags, title,author } = req.body;

    try {

        const updateBlog = {}

        if (imageUrl) { updateBlog.imageUrl = imageUrl };
        if (description) { updateBlog.description = description };
        if (tags) { updateBlog.tags = tags };
        if (title) { updateBlog.title = title };
        if (author) { updateBlog.author = author };

        let blog = await Blog.findByIdAndUpdate(req.params.id, { $set: updateBlog }, { new: true })

        console.log(updateBlog);

        res.status(200).send("blog updated successfully");

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error')
    }
});

router.get('/fetch', async (req, res) => {

    try {

        const blog = await Blog.find().sort({ _id: -1 });
        res.json(blog)

    } catch (error) {

        console.log(error.message);
        res.status(500).send('Internal Server Error')

    }

});

router.delete('/delete/:id', async (req, res) => {
    try {
        
        let blog = await Blog.findById(req.params.id);
        if (!blog) { return res.status(404).send('Not Found') }

        blog = await Blog.findByIdAndDelete(req.params.id)

        res.json({ "Success": "blog Deleted" })

    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router;