const auth = require("../controller/login.controller")
const logout_controller = require("../controller/logout.controller")

const express = require('express')
var router = express.Router()




router.get('/',auth._authenticate, logout_controller._logout)


module.exports = router