const gameSessionModel = require('../../models/gameSession');
const get = (req, res) => {
    const id = req.params.id;
    gameSessionModel.find({
        _id: id
    }).then((resp1) => {
        if(resp1.length === 0){
            res.status(204).send({
                'message': 'Session not found'
            });
        }
        else{
            res.status(200).send({
                'message': 'Session is here',
                'data': resp1
            });
        }
    }).catch((er1) => {
        res.send(er1);
    });
}

module.exports = get;