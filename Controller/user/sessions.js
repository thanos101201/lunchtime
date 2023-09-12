const gameSessionModel = require("../../models/gameSession");

const sessions = (req, res) => {
    const id = req.params.id;
    gameSessionModel.find().then((resp1) => {
        let dt = [];
        if(resp1.length > 0){
            dt = resp1.filter((e) => {
                if(Object.keys(e.scores).indexOf(id) !== -1){
                    return true;
                }
                return false;
            });
        }
        if(dt.length > 0){
            res.status(200).send({
                'message': 'Session history is here',
                'data': dt
            });
        }
        else{
            res.status(204).send({
                'message': 'No session history'
            });
        }
    }).catch((er1) => {
        res.send(er1);
    })
}

module.exports = sessions;