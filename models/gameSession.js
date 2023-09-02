const mongoose = require('mongoose');

const gameSessionSchema = mongoose.Schema({
    restaurantName: {
        type: String
    },
    scores: {
        type: Object
    },
    date: {
        type: String,
        default: "" + new Date().getDate() + " : " + new Date().getMonth() + " : " + new Date().getFullYear()
    }
});

const gameSessionModel = mongoose.model('gameSession',)