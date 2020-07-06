const mongodb = require('mongodb');
const config = require('./config');
const MongoClient = mongodb.MongoClient;

const connectionURL = `mongodb://${config.host}:${config.port}`;
const DBName = config.dbName;

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to DB', error);
    }

    const db = client.db(DBName);

    // db.collection('users').insertOne({
    //     name: 'Cassandra',
    //     age: 35
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Error filling document');
    //     }

    //     console.log(result.ops);
    // })

    db.collection('users').insertMany([
        {
            name: 'Andrew',
            age: 30
        },
        {
            name: 'Laddu',
            age: 36
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert Document');
        }

        console.log(result.ops);
    })
})

