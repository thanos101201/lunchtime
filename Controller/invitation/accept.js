var pollingModel = require('../../models/polling');
var gameSessionModel = require('../../models/gameSession');
const accept = (req, res) => {
    const user1 = req.body.user1;
    const user2 = req.body.user2;
    gameSessionModel.aggregate([
        {
            $match: {
                date: { $eq : new Date().getDate() }
            }
        },//to be implemented
        {
            $addFields: {
              colorExists: {
                $cond: {
                  if: { $eq: [{ $ifNull: ["$details.color", null] }, null] },
                  then: false,
                  else: true
                }
              }
            }
        }
    ]).then((resp1) => {
        if(resp1.length === 0){
            let game = new gameSessionModel();
            game.sessionName = "";
            let obj = {
                [user1]: 0,
                [user2]: 0,
            };
            game.scores = obj;
            game.save().then((resp2) => {
                res.status(200).send({
                    'message': 'Session created',
                    'data': resp2
                });
            }).catch((er2) => {
                res.send(er2);
            });
        }
        else{//to be implemented
            if(Object.keys(resp1[0].scores). length >= 3){
                res.send({
                    'message': 'Group is full'
                });
            }
            else{
                let obj = {
                    [Object.keys(resp1[0].scores)[0]]: 0,
                    [Object.keys(resp1[0].scores)[1]]: 0,
                    [user1]: 0
                }
                gameSessionModel.updateOne({
                    _id: resp1[0]._id
                }, {
                    scores: obj
                }).then((resp2) => {
                    res.status(200).send({
                        'message': 'Invitation accepted'
                    });
                }).catch((er2) => {
                    res.send(er2);
                });
            }
        }
    }).catch((er1) => {
        res.send(er1);
    });
}

module.exports = accept;