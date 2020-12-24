const mongoose = require('mongoose');
const config = require('../../config');

const connectionURL = `mongodb://${config.host}:${config.port}/task-manager-api`;

function connect() {
    mongoose.connect(connectionURL, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
}

connect();
