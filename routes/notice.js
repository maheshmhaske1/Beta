var express = require('express');
var router = express.Router()

router.get('/encryption_notice', function(req, res) {
    res.render('encryption')
})

router.get('/', function(req, res) {
    res.json({ "status": "ok" })
})

module.exports = router