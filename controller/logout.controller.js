exports._logout =  function(req, res) {
    res.cookie("token", "", { expires: new Date(0) });
    res.render('home')
        //res.json({ "status": "Logged out" })
}