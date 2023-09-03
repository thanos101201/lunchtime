const userModel = require('../../models/user');
const login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    userModel.find({
        username: username,
        password: password
    }).then((resp1) => {
        if(resp1.length > 0){
            console.log(resp1);
            res.status(200).send({
                'message': 'User can proceed',
                'data': resp1
            });
        }
        else{
            userModel.find({
                email: username,
                password: password
            }).then((resp2) => {
                if(resp2.length > 0){
                    res.status(200).send({
                        'message': 'User can proceed',
                        'data': resp2
                    });  
                }
                else{
                    res.status(204).send({
                        'message': 'Please check your credentials'
                    });
                }
            }).catch((er2) => {
                res.send(er2);
            });
        }
    }).catch((er1) => {
        res.send(er1);
    })
}

module.exports = login;