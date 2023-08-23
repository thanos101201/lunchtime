const otpModel = require("../../models/otp");
const userModel = require("../../models/user");

const verify = (req, res) => {
    const email = req.body.email;
    const otpNum = req.body.otpNum;
    otpModel.find({
        email: email
    }).then((resp1) => {
        if(resp1.length === 0){
            res.status(204).send({
                'message': 'Otp is not present'
            });
        }
        else{
            if(resp1[0].otpNum == otpNum){
                userModel.updateOne({
                    email: email
                }, {
                    verified: true
                }).then((resp2) => {
                    res.status(200).send({
                        'message': 'Otp is verified'
                    });
                }).catch((er2) => {
                    res.send(er2);
                })
            }
            else{
                res.status(403).send({
                    'message': 'Otp not matched'
                })
            }
        }
    })
}

module.exports = verify;