const gameSessionModel = require('../../models/gameSession');

const filterSession = (user, resp1) => {
    return new Promise((resv, rejt) => {
        if(resp1.length > 0){
            let g = resp1.filter((e) => {
                if(e.scores[user] !== undefined){
                    return true;
                }
                return false;
            });
            resv(g);
        }
        else{
            rejt("No user");
        }
    });
}
const activesession = (req, res) => {
    const user = req.params.user;
    gameSessionModel.find({
        date: "" + new Date().getDate() + " : " + new Date().getMonth() + " : " + new Date().getFullYear()
    }).then(async (resp1) => {
        if(resp1.length > 0){
            await filterSession(user, resp1).then((resp2) => {
                res.status(200).send({
                    'message': 'Session is here',
                    'data': resp2
                });
            }).catch((er2) => {
                res.send(er2);
            });
        }
        else{
            res.status(204).send({
                'message': 'No active session'
            })
        }
    }).catch((er1) => {
        res.send(er1);
    });
}

module.exports = activesession;