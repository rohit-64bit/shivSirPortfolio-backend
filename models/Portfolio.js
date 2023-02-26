const mongoose = require("mongoose");
const { Schema } = mongoose;

const PortfolioSchema = new Schema({


    title: {
        type: String,
        require: true
    },
    type: {
        type: String,
    },
    github: {
        type: String
    },
    hosted: {
        type: Date,
        default: Date.now
    },
    hostedLink: {
        type: String
    },
    imageURL: {
        type: String,
    }

})

module.exports = mongoose.model('portfolio', PortfolioSchema)