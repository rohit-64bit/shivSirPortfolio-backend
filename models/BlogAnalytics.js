const mongoose = require("mongoose");
const { Schema } = mongoose;

const BlogAnalytics = new Schema({

    date: {
        type: Date,
        default: Date.now
    },
    blogID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blog'
    }

})

module.exports = mongoose.model('blogAnalytics', BlogAnalytics)