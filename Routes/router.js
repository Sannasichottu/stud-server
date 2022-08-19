const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");


//register user data
router.post("/create", (req, res) => {
    //console.log(req.body);

    const { firstname, lastname, email, dob, education, location, about } = req.body;

    if (!firstname || !lastname || !email || !dob || !education || !location || !about) {
        res.status(422).json("Please Fill the all Data");
    }

    try {
        conn.query("SELECT * FROM users WHERE email = ?", email, (err, result) => {
            if (result.length) {
                res.status(422).json("This Data is Already Exist")
            } else {
                conn.query("INSERT INTO users SET ?", { firstname, lastname, email, dob, education, location, about }, (err, result) => {
                    if (err) {
                        console.log("err" + err);
                    } else {
                        res.status(201).json(req.body);
                    }
                })
            }
        })
    } catch (error) {
        res.status(422).json(error);
    }
});

module.exports = router;

