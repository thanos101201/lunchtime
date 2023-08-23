const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String
    },
    goal: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    }
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;