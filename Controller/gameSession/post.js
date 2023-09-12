const gameSessionModel = require('../../models/gameSession');
const restaurantModel = require('../../models/restaurant');
const getName = () => {
    return restaurantModel.find().then((resp1) => {
        if(resp1.length > 0){
            return resp1[Math.random()*(resp1.length - 1)].name;
        }
        else{
            return "No restaurant"
        }
    })
}
const getOptions = (name) => {
    return new Promise((resv, rejt) => {
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
                    resv(dish);
                }
                else{
                    rejt("No dishes available")
                }
            }
            else{
                rejt("Restaurant not registered")
            }
        })
    })
}
const post = async (req, res) => {
    const username = req.body.username;
    let gamem = new gameSessionModel();
    let obj = {
        [username]: 0
    };
    let cnt = {
        [username]: 0
    }
    gamem.scores = obj;
    gamem.counts = cnt;
    let name = await getName();
    gamem.restaurantName = name;
    gamem.save().then((resp1) => {
        // getOptions(name).then((resp2) => {
        //     res.status(200).send({
        //         'message': 'Options are here',
        //         'data': resp2
        //     });
        // }).catch((er2) => {
        //     res.send(er2);
        // });
        res.status(200).send({
            'message': 'Session created',
            'data': resp1
        });
    }).catch((er1) => {
        res.send(er1);
    });
}

module.exports = post;