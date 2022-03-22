const jwt = require("jsonwebtoken")

var login = require('../model/login.model')
var ragister = require('../model/ragister.model')
var message = require('../model/messages.model')


let loginn = 0;
let reg = 22;
exports._counting = (req, res) => {
    res.json({ "counting": loginn })
    loginn = loginn + 1
}



exports._v=(req, res) => {
    if (loginn == 0 || reg == 2) {
        res.send("ok")
    } else {
        res.send("not ok")
    }
}




exports._login =function(req, res) {
    res.render("login")
}




exports._dashboard =async function(req, res) {
    var user_email = req.user_email
        //console.log(user_email)
    const ragisterdata = await ragister.find()
    const messagedata = await message.find({ to: user_email })
    res.render('dashboard', { ragister: ragisterdata, message: messagedata, user_email })
        //res.json({ ragisterdata, messagedata })
}





let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();
if (hours > 12) {
    hours = hours - 12
} else {
    hours = hours
}
let time = hours + ":" + minutes;
let current_date = date + ":" + month + ":" + year
exports._sendmessage =  async function(req, res) {
    const isaccountpresent =await ragister.find({email:req.body.to}).countDocuments()
    // console.log(isaccountpresent)
 
    if (req.body.to == req.user_email) {
        res.json({ "error": "error" })
    }
    else if (isaccountpresent<=0) {
        res.send("Account not found...")
    } else {
        new message({
                from: req.user_email,
                to: req.body.to,
                messages: req.body.messages,
                time: time,
                date: current_date,
            }).save().then((data) => {
                return res.json({ status: true })
            })
            .catch((err) => {
                res.json({ status: 'error' })
            })
    }
}


var jwtkey = "key"
exports._authenticate = function(req, res, next) {
    const bearerHeader = req.cookies['token'];
    token = bearerHeader;
    //authuser parameter returns the which user generates key...
    jwt.verify(token, jwtkey, (error, authdata) => {
        if (error) {
            res.json({
                "STATUS": "YOU ARE NOT AUTHORIZED PLEASE LOGIN...",
                "DETAIL": error
            })
        } else {
            req.user_email = authdata.data.email
            next()
                //res.json({ token })
        }
    })
    if (bearerHeader == undefined) {
        res.send("Please Provide Token")
    }
}



exports._postlogin = function(req, res) {
    ragister.findOne({ email: req.body.email })
        .then(function(data) {
            if (data.password == req.body.password) {
                console.log("logged in");
                jwt.sign({ data }, jwtkey, { expiresIn: "1h" }, function(error, token) {
                    res.cookie("token", token)
                    res.redirect("/login/dashboard")
                        //res.render("dashboard", { data })
                        //res.status(200).json({ token })
                        //res.json({ "status": "Logged In" })
                })

            } else {
                res.json({ "status": "Wrong Username Or Password " })
            }
        }).catch(function(err) {
            res.json({ "Status": "FAILED TO LOGIN" })
        })
}

