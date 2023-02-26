const mongoose = require('mongoose');

require('dotenv').config()
const env = process.env
mongoose.set('strictQuery', true);

const mongoURI = env.mongoURI;

const connectToMongo = () => {
    mongoose.connect(mongoURI, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("connected to db successfully");
        }
    })
}

module.exports = connectToMongo;