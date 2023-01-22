const mongoose = require("mongoose");
const { Schema } = mongoose;

const BlogSchema = new Schema({

    imageUrl: {
        type: String,
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
    },
    tags: [
        {
            type: String
        }
    ],
    author: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('blog', BlogSchema)