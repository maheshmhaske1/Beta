var mongoose = require('mongoose')

var loginschema = new mongoose.Schema({
    email: {
        type: 'string',
        unique: true
    },
    password: {
        type: 'string',
        unique: true
    }
})

module.exports = mongoose.model("login", loginschema)