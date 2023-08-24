const mongoose = require('mongoose');

const pollingSchema = mongoose.Schema({
    pollArray: {
        type: Array
    }
});
const pollingModel = mongoose.model('Polling', pollingSchema);

module.exports = pollingModel;