const otpModel = require('../../models/otp');
const otpgen = require('otp-generator');
const get = (req, res) => {
    const email = req.params.email;
    const otpNum = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    otpModel.find({
        email: email
    }).then((resp1) => {
        if(resp1.length === 0){
            otpModel.updateOne({
                email: email
            }, {
                otpNum: otpNum
            }).then((resp2) => {
                res.status(200).send({
                    'message': 'Otp is send'
                });
            }).catch((er2) => {
                res.send(er2);
            })
        }
        else{
            let otpm = new otpModel();
            otpm.email = email;
            otpm.otpNum = otpNum;
            otpm.save().then((resp2) => {
                res.send({
                    'message': 'Otp send'
                });
            }).catch((er2) => {
                res.send(er2);
            })
        }
    }).catch((er1) => {
        res.send(er1);
    })
}

module.exports = get;