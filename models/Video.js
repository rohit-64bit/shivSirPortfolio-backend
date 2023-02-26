const mongoose = require("mongoose");
const { Schema } = mongoose;

const VideoSchema = new Schema({

    videoLink: {
        type: String,
        require: true
    },
    imageLink: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    authorName: {
        type: String,
        require: true
    },
    providerName: {
        type: String,
        require: true
    },
    url: {
        type: String,
        require: true
    },
    authorUrl: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('video', VideoSchema)