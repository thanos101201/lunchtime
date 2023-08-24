const gameSessionModel = require('../../models/gameSession');
const getName = async() => {
    return await restaurantModel.find().then((resp1) => {
        if(resp1.length > 0){
            let ind = Math.floor(Math.random() * (resp1.length + 1));
            return resp1[ind].name;
        }
        else{
            return "";
        }
    }).catch((er1) => {
        return er1;
    });
}

const post = async (req, res) => {

    const user1 = req.body.user1;
    const user2 = req.body.user2;
    const user3 = req.body.user3;
    let obj = {
        [user1] : 0,
        [user2] : 0,
        [user3] : 0
    };
    try{
        const sessionName = "";
        let sessionm = new gameSessionModel();
        sessionm.sessionName = sessionName;
        sessionm.restaurantName = await getName();
        sessionm.scores = obj;
        sessionm.save().then((resp1) => {
            res.status(200).send({
                'message': 'Session created'
            });
        }).catch((er1) => {
            res.send(er1);
        })
    }catch(ex){
        res.send(ex);
    }
}

module.exports = post;