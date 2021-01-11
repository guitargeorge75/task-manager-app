const express = require('express');
const bcrypt = require('bcryptjs');
const userRouter = require('./routers/users');
const taskRouter = require('./routers/tasks');
require('./db/mongoose');

const app = express();
const port = process.env.PORT || '4006';

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('app is up and running!');
});

const Task = require('./models/task');
const User = require('./models/user');

const main = async () => {
    // const task = await Task.findById('5ff3b4ea2595e03ee7fe5933');
    // await task.populate('owner').execPopulate();
    // console.log(task.owner);

    const user = await User.findById('5ff3b3ebe3bf783ea3f2d282');
    await user.populate('tasks').execPopulate();
    console.log(user.tasks);
}

main()