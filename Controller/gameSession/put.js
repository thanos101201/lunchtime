const gameSessionModel = require('../../models/gameSession');
const restaurantModel = require('../../models/restaurant');

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
        }).catch((er1) => {
            rejt(er1);
        })
    })
}

const put = (req, res) => {
    const user = req.body.user;
    const score = req.body.score;
    const session = req.body.session;
    gameSessionModel.find({
        _id: session
    }).then((resp1) => {
        if(resp1.length === 0){
            res.status(204).send({
                'message': 'No game session found',
            });
        }
        else{
            let scores = resp1[0].scores;
            let counts = resp1[0].counts;
            scores[user] += score;
            counts[user] += 1;
            gameSessionModel.updateOne({
                _id: session
            }, {
                scores: scores,
                counts: counts
            }).then(async (resp2) => {
                await getOptions(resp1[0].restaurantName).then((resp3) => {
                    res.status(200).send({
                        'message': 'Option is here',
                        'data': resp3
                    });
                }).catch((er) => {
                    res.send(er);
                })
                // res.status(200).send({
                //     'message': 'Score updated'
                // });
            }).catch((er2) => {
                res.send(er2);
            });
        }
    }).catch((er1) => {
        res.send(er1);
    });
}

module.exports = put;