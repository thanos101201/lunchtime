var pollingModel = require('../../models/polling');

const allocate = async() => {
    pollingModel.find().then(async (resp1) => {
        if(resp1.length === 0){
            return;
        }
        else{
            var ind = 0;
            try{
                await Promise.all(async() => {
                    for(; resp1.length-ind > 3; ){
                        let game = new gameSessionModel();
                        game.restaurantName = await getName();
                        game.sessionName = "";
                        let obj = {
                            [resp1[ind]] : 0,
                            [resp1[ind+1]]: 0
                        }
                        game.scores = obj;
                        await game.save();
                        ind+=2;
                    }
                    if(resp1.length - ind -1 === 3){
                        let game = new gameSessionModel();
                        game.restaurantName = await getName();
                        game.sessionName = "";
                        let obj = {
                            [resp1[ind]] : 0,
                            [resp1[ind+1]]: 0,
                            [resp1[ind+2]]: 0
                        }
                        game.scores = obj;
                        await game.save();
                    }
                    else if(resp1.length - ind -1 === 2){
                        let game = new gameSessionModel();
                        game.restaurantName = await getName();
                        game.sessionName = "";
                        let obj = {
                            [resp1[ind]] : 0,
                            [resp1[ind+1]]: 0
                        }
                        game.scores = obj;
                        await game.save();
                    }
                }).then(() => {
                    pollingModel.deleteMany().then(() => {
                        return "Polling allocated";
                    }).catch((er) => {
                        return er;
                    });
                }).catch((er1) => {
                    return er1;
                })
            }catch(exp){
                return exp;
            }
        }
    })
}

module.exports = allocate;
