const gameSessionModel = require('../../models/gameSession');
const restaurantModel = require('../../models/restaurant');
const getName = () => {
    return restaurantModel.find().then((resp1) => {
        if(resp1.length > 0){
            return resp1[Math.random()*(resp1.length - 1)].name;
        }
        else{
            return "No restaurant"
        }
    })
}

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
        })
    })
}
const post = async (req, res) => {
    const username = req.body.username;
    let gamem = new gameSessionModel();
    let chk = await checkUserSession(username)
    console.log(chk);
    if(chk){
        let obj = {
            [username]: 0
        };
        let cnt = {
            [username]: 0
        }
        gamem.scores = obj;
        gamem.counts = cnt;
        let name = await getName();
        gamem.restaurantName = name;
        gamem.save().then((resp1) => {
            // getOptions(name).then((resp2) => {
            //     res.status(200).send({
            //         'message': 'Options are here',
            //         'data': resp2
            //     });
            // }).catch((er2) => {
            //     res.send(er2);
            // });
            res.status(200).send({
                'message': 'Session created',
                'data': resp1
            });
        }).catch((er1) => {
            res.send(er1);
        });
    }
    else{
        res.status(403).send({
            'message': 'Session already present',
            'data': chk
        })
    }
}

module.exports = post;