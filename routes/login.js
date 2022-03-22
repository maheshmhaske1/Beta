var express = require('express');
var router = express.Router()

var ragister = require('../model/ragister.model')
var message = require('../model/messages.model')

const logincontroller = require("../controller/login.controller")





router.get('/', logincontroller._login)


router.get('/counting', logincontroller._counting)


router.get('/v', logincontroller._v)


router.get("/dashboard", logincontroller._authenticate, logincontroller._dashboard)


router.post('/', logincontroller._postlogin)


router.post('/sendmessage', logincontroller._authenticate, logincontroller._sendmessage)

router.get("/delete/:id",function(req,res){
message.findOneAndRemove(req.params._id,function(err,result){
    if(!err)
    {
        console.log(result)
        res.json({"status":"deleted"})
    }
})
})






module.exports = router