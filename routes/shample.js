var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator')

var shample = require('../model/shample.model');

router.get('/', function (req, res) {
    res.render("shample")
})


router.post('/add', function (req, res) {
    new shample({
        name: req.body.name,
        email: req.body.email
    })
        .save()
        .then((result) => {
            return res.json({ status: true })
        }).catch((err) => {
            res.json({ "error": err })
        });
})

router.get('/getdata', async (req, res) => {

    const results = await shample.find({}).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.json(err)
    });
    console.log(results);

    // shample.findOne({ name: "mahesh" }).then((result) => {
    //     res.json({ "rwsult": result })
    // })
})

module.exports = router