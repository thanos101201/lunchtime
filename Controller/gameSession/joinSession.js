const e = require('cors');
const gameSessionModel = require('../../models/gameSession');
const join = (req, res) => {
    const id = req.body.id;
    const username = req.body.username;
    gameSessionModel.find({
        _id: id
    }).then((resp1) => {
        if(resp1.length === 0){
            res.status(204).send({
                'message': 'Session not found'
            });
        }
        else{
            let j = Object.keys(resp1[0].scores);
            if(j.length > 2){
                res.status(403).send({
                    'message': 'Session is full'
                });
            }
            else{
                let obj = {};
                if(j.length === 2){
                    obj[username] = 0;
                    obj[j[0]] = resp1[0].scores[j[0]];
                    obj[j[1]] = resp1[0].scores[j[1]];
                }
                else if(j.length === 1){
                    obj[username] = 0;
                    obj[j[0]] = resp1[0].scores[j[0]];
                }
                gameSessionModel.updateOne({
                    _id: id
                }, {
                    scores: obj
                }).then((resp1) => {
                    res.status(200).send({
                        'message': 'Joined session'
                    });
                }).catch((er1) => {
                    res.send(er1);
                })
            }
        }
    })
}

module.exports = join;