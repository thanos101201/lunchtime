const e = require('cors');
const gameSessionModel = require('../../models/gameSession');

const checkUserSession = async (username) => {
    return await gameSessionModel.find({
        date: "" + new Date().getDate() + " : " + new Date().getMonth() + " : " + new Date().getFullYear()
    }).then((resp1) => {
        // console.log(`Resp1 ${resp1.length}`);
        if(resp1.length === 0){
            return true;
        }
        let ar = resp1.filter((e) => {
            if(Object.keys(e.scores).indexOf(username) !== -1){
                return true;
            }
            return false;
        });
        // console.log(ar);
        if(ar.length > 0){
            // console.log(`Ar length ${ar.length}`);
            return false;
        }
        return true;
    }).catch((er) => {
        return er;
    })
}

const join = (req, res) => {
    const id = req.body.id;
    console.log(id);
    const username = req.body.username;
    gameSessionModel.find({
        _id: id
    }).then(async (resp1) => {
        if(resp1.length === 0){
            console.log(resp1);
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
                let chk = await checkUserSession(username);
                if(chk){
                    let obj = {};
                    let cnt = {};
                    if(j.length === 2){
                        obj[username] = 0;
                        obj[j[0]] = resp1[0].scores[j[0]];
                        obj[j[1]] = resp1[0].scores[j[1]];
                        cnt[username] = 0;
                        cnt[j[0]] = resp1[0].counts[j[0]];
                        cnt[j[1]] = resp1[0].counts[j[1]];
                    }
                    else if(j.length === 1){
                        obj[username] = 0;
                        obj[j[0]] = resp1[0].scores[j[0]];
                        cnt[username] = 0;
                        cnt[j[0]] = resp1[0].counts[j[0]];
                    }
                    gameSessionModel.updateOne({
                        _id: id
                    }, {
                        scores: obj,
                        counts: cnt
                    }).then((resp1) => {
                        res.status(200).send({
                            'message': 'Joined session'
                        });
                    }).catch((er1) => {
                        res.send(er1);
                    })
                }
                else{
                    res.status(403).send({
                        'message': 'Session already played',
                        'data': chk
                    });
                }
            }
        }
    })
}

module.exports = join;