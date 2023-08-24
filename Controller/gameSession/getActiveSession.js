const gameSessionModel = require('../../models/gameSession');

const activesession = (req, res) => {
    const user = req.body.user;
    gameSessionModel.aggregate([
        {
            $match: {
                date : { $eq :  new Date().getDate()}
            }
        },
        {
            $match: {
                scores :  { $match : {
                    [user]: {
                        $exist: true
                    }
                } }
            }
        }
    ]).then((resp1) => {
        res.status(200).send({
            'message': 'Session is here',
            'data': resp1
        });
    }).catch((er1) => {
        res.send(er1);
    });
}

module.exports = activesession;