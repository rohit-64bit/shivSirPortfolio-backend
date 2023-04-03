const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Admin = require("../models/Admin")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fetchAdmin = require('../middleware/fetchAdmin');
const { findOne } = require('../models/Admin');


require('dotenv').config()
const env = process.env;

jwtSecret = env.JWT_SECRET_ADMIN;

// ROUTE 2 : Authenticate a Admin using : POST '/api/auth/admin/authAdmin' Require auth

router.post('/authadmin', [
    body('email', 'Enter a valid e-mail').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }
        const passCompare = await bcrypt.compare(password, admin.password);
        if (!passCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }
        const data = {
            admin: {
                id: admin.id
            }
        }
        const authtoken = jwt.sign(data, jwtSecret)
        res.json({ authtoken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3 : Authenticate a Admin using : POST '/api/auth/Admin/getAdmin' Require auth
router.post('/getadmin', fetchAdmin, async (req, res) => {
    try {
        adminID = req.admin.id
        const admin = await Admin.findById(adminID).select("-password")
        res.send(admin);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE 4 : Authenticate a Admin using : POST '/api/auth/admin/update' Require auth
router.put('/update/:id', fetchAdmin, async (req, res) => {

    const { adminName } = req.body;

    try {

        const updateAdmin = {}

        if (adminName) { updateAdmin.adminName = adminName };

        let admin = await Admin.findByIdAndUpdate(req.params.id, { $set: updateAdmin }, { new: true })

        if (admin) {
            return res.status(200).json({ success: "Profile Updated Successfully" })
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE 5 : Authenticate a Admin using : POST '/api/auth/admin/update/password/:id' Require auth

router.put('/update/password/:id', fetchAdmin, async (req, res) => {

    console.log(req.body);

    try {

        let { email, password, newPassword } = req.body;

        const admin = await Admin.findOne({ email })

        if (!admin) {
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }

        const passCompare = await bcrypt.compare(password, admin.password);
        if (!passCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }

        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(newPassword, salt);

        updateAdmin = await Admin.findByIdAndUpdate(req.params.id, {
            password: secPass
        }, { new: true })

        res.status(200).json({ success: "Password Updated Successfully" })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router