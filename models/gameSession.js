const mongoose = require('mongoose');

const gameSessionSchema = mongoose.Schema({
    restaurantName: {
        type: String
    },
    scores: {
        type: Object
    },
    count: {
        type: Number,
        default: 0
    },
    date: {
        type: String,
        default: "" + new Date().getDate() + " : " + new Date().getMonth() + " : " + new Date().getFullYear()
    }
});

const gameSessionModel = mongoose.model('gameSession', gameSessionSchema);

module.exports = gameSessionModel;