const userModel = require("../../models/user");

const get = (req, res) => {
    const email = req.params.email;
    userModel.find({
        email: email
    }).then(async (resp1) => {
        if(resp1.length === 0){
            await userModel.find({
                username: email
            }).then((resp2) => {
                if(resp2.length > 0){
                    res.status(200).send({
                        'message': 'User is here',
                        'data': resp2[0]
                    });
                }
                else{
                    res.status(204).send({
                        'message': 'User not found'
                    })
                }
            }).catch((er2) => {
                res.send(er2);
            })
        }
        else{
            res.send({
                'message': 'User is here',
                'data': resp1
            });
        }
    }).catch((er1) => {
        res.send(er1);
    });
}

module.exports = get;