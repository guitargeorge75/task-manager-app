const mongoose = require('mongoose');
const validator = require('validator');
const config = require('../../config');

const connectionURL = `mongodb://${config.host}:${config.port}/task-manager-api`;

function connect() {
    mongoose.connect(connectionURL, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
}

function addUser() {
    const User = mongoose.model('User', {
        name: {
            type: String,
            required: true,
            trim: true
        },
        age: {
            type: Number,
            default: 0,
            validate(value) {
                if (value < 0) {
                    throw new Error('Age must be greater than 0');
                }
            }
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid Email')
                }
            }
        },
        password: {
            type: String,
            required: true,
            trim: true,
            validate(value) {
                if(value.length < 6) {
                    throw new Error('Password must be longer than 6 characters')
                };
                if(value.toLowerCase().includes('password')) {
                    throw new Error('Password cannot contain the word password')
                }
            }
        }
    });
    
    const me = new User({
        name: 'Cassandra Lou',
        email: 'CassandraLou@live.com',
        password: 'myPass123'
    });
    
    me.save().then((response) => {
        console.log(response);
    }).catch((err) => {
        console.log('Error', err);
    });    
};

function addTask() {
    const Task = mongoose.model('Task', {
        description: {
            type: String,
            trim: true,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        }
    });

    const myTask = new Task({
        completed: true
    }).save().then((response) => {
        console.log(response);
    }).catch((err) => {
        console.log(err);
    });
};

connect();
addTask();

