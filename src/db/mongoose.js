const mongoose = require('mongoose');

const connectionURL = `mongodb://${process.env.MONGODBHOST}:${process.env.MONGODBPORT}/${process.env.MONGODBNAME}`;

function connect() {
    mongoose.connect(connectionURL, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
}

connect();
