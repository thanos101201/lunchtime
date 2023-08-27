const gameSessionModel = require('../../models/gameSession');

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
            scores[user] += score;
            gameSessionModel.updateOne({
                _id: session
            }, {
                scores: scores
            }).then((resp2) => {
                res.status(200).send({
                    'message': 'Score updated'
                });
            }).catch((er2) => {
                res.send(er2);
            });
        }
    }).catch((er1) => {
        res.send(er1);
    });
}

module.exports = put;