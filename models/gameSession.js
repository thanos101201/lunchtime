const mongoose = require('mongoose');

const gameSessionSchema = mongoose.Schema({
    sessionName: {
        type: String,
        required: true
    },
    restaurantName: {
        type: String
    },
    scores: {
        type: Object
    },
    date: {
        type: Date,
        default: new Date()
    }
});

const gameSessionModel = mongoose.model('gameSession',)