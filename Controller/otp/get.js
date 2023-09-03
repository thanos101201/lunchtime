const otpModel = require('../../models/otp');
const otpgen = require('otp-generator');
const nodemailer = require('nodemailer');
const get = (req, res) => {
    const email = req.headers.email;
    console.log(email);
    const otpNum = otpgen.generate(6, { upperCaseAlphabets: false, specialChars: false });
    otpModel.find({
        email: email
    }).then((resp1) => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'pratikthakur2019@gmail.com',
                pass: 'tumaqnhvuanufppp'
            }
        });
        var mailOptions = {
            from: 'pratikthakur2019@gmail.com',
            to: email,
            subject: "Lunch Time Otp",
            text: `
            Your Otp for email verification is ${otpNum}
            `
        };
        transporter.sendMail(mailOptions, (err, info) => {
            if(err){
                res.send(err);
            }
            else{
                console.log("Send");
                if(resp1.length > 0){
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
                        res.status(200).send({
                            'message': 'Otp is send'
                        });
                    }).catch((er2) => {
                        res.send(er2);
                    })
                }
            }
        });
    }).catch((er1) => {
        res.send(er1);
    })
}

module.exports = get;