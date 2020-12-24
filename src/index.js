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

// const myFunc = async () => {
//     const password = 'red1234!';
//     const hashedPassword = await bcrypt.hash(password, 8);
//     console.log(password);
//     console.log(hashedPassword);

//     const isMatch = await bcrypt.compare('red1234', hashedPassword);

//     console.log(isMatch);
// };

// myFunc();

