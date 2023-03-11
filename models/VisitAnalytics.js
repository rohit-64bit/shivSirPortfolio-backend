const mongoose = require('mongoose');
const { schema } = require('./BlogAnalytics');
const { Schema } = mongoose;

const VisitAnalytics = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    data: {
        type: String
    }
})

module.exports = mongoose.model('visitAnalytics', VisitAnalytics)