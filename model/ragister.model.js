var mongoose = require('mongoose')

var ragisterschema = new mongoose.Schema({
    first_name: {
        type: 'string',
        unique: false,
    },
    last_name: {
        type: 'string',
        unique: false,
    },
    email: {
        type: 'string',
        unique: true
    },
    password: {
        type: 'string',
        unique: false
    },
    mobile: {
        type: 'Number',
        unique: true
    },

})

module.exports = mongoose.model("ragister", ragisterschema)