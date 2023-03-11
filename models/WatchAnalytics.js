const mongoose = require("mongoose");
const { Schema } = mongoose;

const WatchAnalytics = new Schema({

    date: {
        type: Date,
        default: Date.now
    },
    videoID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blog'
    }

})

module.exports = mongoose.model('watchAnalytics', WatchAnalytics)