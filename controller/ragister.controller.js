var ragister = require('../model/ragister.model')


exports._getragister =  function(req, res) {
    res.render("ragister")
}


exports._postragister = function(req, res) {
    //console.log("ragister hit...")
    new ragister({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        mobile: req.body.mobile,
    }).save().then((result) => {
        return res.json({ status: true })
    }).catch((err) => {
        res.json(err)
    });
}