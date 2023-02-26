const express = require('express');

const router = express.Router();
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');
require('dotenv').config()
const env = process.env;



router.get('/fetch', async (req, res) => {
    try {
        const contact = await Contact.find().sort({ _id: -1 });
        res.json(contact)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error')
    }
})



router.post('/feedback', async (req, res) => {

    const { subject, name, email, body } = req.body;

    try {

        const contact = Contact(req.body)
        contact.save();

        const client = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: env.MAIL,
                pass: env.MAIL_PASSWORD
            }
        });

        client.sendMail(
            {
                from: env.MAIL,
                to: env.COLLECTION_MAIL,
                subject: `${subject}`,
                text: `Name : ${name}\nFrom : ${email}\nMessage:${body}`
            }
        )

        client.sendMail(
            {
                from: env.MAIL,
                to: `${email}`,
                subject: `Thankyou For Your Feedback`,
                text: `Thankyou For Your Feedback\nRegards\nShibdas Bhattacharya\nTopStack`
            }
        )

        res.status(200).send({ success: "Success" })

    } catch (error) {
        console.log(error.message);
    }

})

router.post('/contact', async (req, res) => {

    const { subject, name, email, body } = req.body;

    try {

        const contact = Contact(req.body)
        contact.save();

        const client = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: env.MAIL,
                pass: env.MAIL_PASSWORD
            }
        });

        client.sendMail(
            {
                from: env.MAIL,
                to: env.COLLECTION_MAIL,
                subject: `${subject}`,
                text: `Name : ${name}\nFrom : ${email}\nMessage:${body}`
            }
        )

        client.sendMail(
            {
                from: env.MAIL,
                to: `${email}`,
                subject: `${name} Thankyou for reaching out to us.`,
                text: `Thankyou For Your Feedback\nRegards\nShibdas Bhattacharya\nTopStack`
            }
        )

        res.status(200).send({ success: "Success" })

    } catch (error) {
        console.log(error.message);
    }

})


module.exports = router;