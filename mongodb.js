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

    // db.collection('users').findOne({
    //     _id: new ObjectID('5f0393ee0de33c21b6c7e69b')
    // }, (err, user) => {
    //     if (err) {
    //         return console.log('User not found')
    //     }
    //     console.log(user);
    // });

    // db.collection('users').find({
    //     age: 33
    // }).count((err, count) => {
    //     if (err) {
    //         return console.log('not found!')
    //     }
    //     return console.log(count);
    // });

    // db.collection('tasks').find({
    //     completed: true
    // }).toArray((err, tasks) => {
    //     if (err) {
    //         return console.log('not found!')
    //     }
    //     return console.log(tasks);
    // });

    // db.collection('tasks').findOne({
    //     _id: new ObjectID('5f0388f7f307801ca5d189fb')
    // }, (err, task) => {
    //     if (err) {
    //         return console.log('User not found')
    //     }
    //     console.log(task);
    // });

    // db.collection('users').updateOne({
    //     _id: new ObjectID('5f037f2d252e6717eb4681b0'),

    // },{
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) => {
    //     console.log('Success', result)
    // }).catch((error) => {
    //     console.log('Error!', error)
    // });

    // db.collection('tasks').updateMany({
    //     completed: false

    // },{
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log('Success', result.modifiedCount)
    // }).catch((error) => {
    //     console.log('Error!', error)
    // });

    // db.collection('users').deleteMany({
    //     age: 15
    // }).then((result) => {
    //     console.log('Success', result.modifiedCount)
    // }).catch((err) => {
    //     console.log('Error', err)
    // })

    db.collection('tasks').deleteOne({
        description: "Finish Recording"
    }).then((result) => {
        console.log('Success', result)
    }).catch((err) => {
        console.log('Error', err)
    })

})

