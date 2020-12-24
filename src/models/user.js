const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
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
        unique: true,
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
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain the word password')
            }
        }
    }
});

//hash the plaintext password
userSchema.pre("save", async function(next) {
    const user = this;

    if (user.isModified('password')) {
        const encryptedPassword = await bcrypt.hash(user.password, 8);
        user.password = encryptedPassword;
    }
    next();
});

userSchema.statics.findByCredentials = async(email, password) => {
    const user = this;
    const foundUser = await user.findOne({email});
    if (!foundUser) {
        throw new Error('Unable to login');
    };
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        throw new Error ('Unable to login')
    };
    return user;
}



const User = mongoose.model('User', userSchema);

module.exports = User;
