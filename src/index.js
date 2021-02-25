const express = require('express');
const path = require('path');
const hbs = require('hbs');
const userRouter = require('./routers/users');
const taskRouter = require('./routers/tasks');
require('./db/mongoose');

const app = express();
const port = process.env.PORT;

const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views');

app.use(express.json());
app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(express.static(publicDirectory));
app.use(userRouter);
app.use(taskRouter);


app.listen(port, () => {
    console.log('app is up and running on PORT!', process.env.PORT);
});
