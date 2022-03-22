var express = require('express');
var router = express.Router()


const ragister_controller = require("../controller/ragister.controller")



router.get('/', ragister_controller._getragister)

router.post('/', ragister_controller._postragister)

module.exports = router