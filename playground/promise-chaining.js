require('../src/db/mongoose');
const User = require('../src/models/user');

// User.findByIdAndUpdate('5f3c80ef70a81e6d3e353311', {age: 20}).then((user) => {
//     console.log(user);
//     return User.countDocuments({age: 20});
// }).then((users) => {
//     console.log(users);
// }).catch((e) => {
// })

const updateAgeAndCount = async (id, age) => {
    const Users = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({age});
    return {
        Users,
        count
    };
};

 updateAgeAndCount('5f3c80ef70a81e6d3e353311', 31).then((res) => {
     console.log(res);
 }).catch((err) => {
     console.log(err);
 });