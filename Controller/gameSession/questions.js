const restaurantModel = require("../../models/restaurant");

const questions = (req, res) => {
    const name = req.body.name;
    restaurantModel.find({
        name: name
    }).then((resp1) => {
        if(resp1.length > 0){
            let dish = [];
            if(resp1[0].dishes.length > 0){
                const indexes = [];
                while (indexes.length < 3) {
                    const randomIndex = Math.floor(Math.random() * resp1[0].dishes.length);
                    // Ensure the selected index is unique
                    if (!indexes.includes(randomIndex)) {
                        dish.push(resp1[0].dishes[randomIndex]);
                        indexes.push(randomIndex);
                    }
                }
                res.status(200).send({
                    'message': 'Options are here',
                    'data': dish
                });
            }
            else{
                res.status(204).send({
                    'message': 'No dishes present'
                })
            }
        }
        else{
            res.status(204).send({
                'message': 'Restaurant not registered'
            })
        }
    }).catch((er) => {
        res.send(er);
    });
}

module.exports = questions;