const mongoose = require("mongoose");
const { Schema } = mongoose;

const ContactForm = new Schema({

    date: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }


})

module.exports = mongoose.model('contactForm', ContactForm)