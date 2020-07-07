// const mongodb = require('mongodb');
const config = require('./config');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const {MongoClient, ObjectID} = require('mongodb');

const connectionURL = `mongodb://${config.host}:${config.port}`;
const DBName = config.dbName;

const ID = new ObjectID();
console.log(ID);
console.log(ID.getTimestamp());

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to DB', error);
    }

    const db = client.db(DBName);

    // db.collection('users').insertOne({
    //     name: 'Danny',
    //     age: 33
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Error filling document');
    //     }

    //     console.log(result.ops);
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Andrew',
    //         age: 30
    //     },
    //     {
    //         name: 'Laddu',
    //         age: 36
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert Document');
    //     }

    //     console.log(result.ops);
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Finish Recording',
    //         completed: true
    //     },
    //     {
    //         description: 'Buy groceries',
    //         completed: false
    //     },
    //     {
    //         description: 'File Taxes',
    //         completed: true
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert tasks');
    //     }

    //     console.log(result.ops);
    // })
})

