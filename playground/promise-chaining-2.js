require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.findByIdAndDelete('5f728d5a281d70c6f81409a3').then((document) => {
//     return Task.countDocuments({completed: false});
// }).then((count) => {
//     console.log(count);
// }).catch((e) => {
//     console.log(e);
// })

const deleteByIDAndCount = async (id, completed) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({ completed });
    return {
        task,
        count
    };
};

deleteByIDAndCount('5f8263e2dbeaef7a8289eb4d', 'false').then((res) => {
    console.log(res)
}).catch((err) => {
    console.log(err);
});