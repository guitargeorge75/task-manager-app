const mongoose = require('mongoose');

const connectionURL = process.env.MONGODBCONNECTIONSTRING;

function connect() {
    mongoose.connect(connectionURL, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
}

connect();
