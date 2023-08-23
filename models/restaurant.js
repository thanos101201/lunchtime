const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dishes: {
        type: Array,
        required: true
    }
});

const restaurantModel = mongoose.model('Restaurant', restaurantSchema);

module.exports = restaurantModel;