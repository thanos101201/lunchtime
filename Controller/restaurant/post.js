const restaurantModel = require("../../models/restaurant");

const post = (req, res) => {
    const name = req.body.name;
    const dishes = req.body.dishes;
    let restm = new restaurantModel();
    restm.name = name;
    restm.dishes = dishes;
    restm.save().then((resp1) => {
        res.status(200).send({
            'message': 'Restautant added'
        });
    }).catch((er1) => {
        res.send(er1);
    })
}

module.exports = post;