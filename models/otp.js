const mongoose = require('mongoose');
const otpSchema =  mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otpNum: {
        type: String,
        required: true
    }
});

const otpModel = mongoose.model('Otp', otpSchema);

module.exports = otpModel;