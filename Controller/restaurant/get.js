const restaurantModel = require('../../models/restaurant');
const get = (req, res) => {
    const name = req.params.name;
    restaurantModel.find({
        name: name
    }).then((resp1) => {
        res.status(200).send({
            'message':  'restaurant is here',
            'data': resp1
        });
    }).catch((er1) => {
        res.send(er1);
    })
}

module.exports = get;