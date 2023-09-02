const gameSessionModel = require('../../models/gameSession');
const restaurantModel = require('../../models/restaurant');
const getName = () => {
    return restaurantModel.find().then((resp1) => {
        if(resp1.length > 0){
            return resp1[Math.random()*(resp1.length - 1)];
        }
        else{
            return "No restaurant"
        }
    })
}
const post = async (req, res) => {
    const username = req.body.username;
    let gamem = new gameSessionModel();
    let obj = {
        [username]: 0
    };
    gamem.scores = obj;
    gamem.restaurantName = await getName();
    gamem.save().then((resp1) => {
        res.send({
            'message': 'Session created',
            'data': resp1
        });
    }).catch((er1) => {
        res.send(er1);
    });
}

module.exports = post;