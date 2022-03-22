var mongoose = require('mongoose')

mongoose.connect("mongodb+srv://mahesh:mahi3332@cluster0.kjb1q.mongodb.net/trio?retryWrites=true&w=majority", (err) => {
    if (!err) {
        console.log("Connected With Database...")
    } else {
        console.log("NETWORK ERROR...", err)
    }
})