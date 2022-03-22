const express = require("express");
const { error } = require("jquery");
const router = express.Router()
var nodemailer = require('nodemailer');


const forgotpass = require("../controller/forgot.password.controller")
const ragister_check = require("../model/ragister.model")

router.get("/", forgotpass._forgotpassword_get)



router.post("/",  function (req, res) {
    ragister_check.find({ email: req.body.email })
    .then(function (data) {
        const password =data[0].password
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'maheshmhaskepappya@gmail.com',
                pass: 'Mahi@3332'
            }
        });

        var mailOptions = {
            from: 'maheshmhaskepappya@gmail.com',
            to: req.body.email,
            subject: 'Your Password For Bita Login',
            text: "Password is "+password
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        return res.json({ status: true })
    }
    )
    .catch(function(err){
        res.json({"status":"No Account Found..."})
    })
    
})


module.exports = router