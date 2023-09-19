const nodemailer = require('nodemailer');
const userModel = require('../../models/user');
const send = (email) => {
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
        subject: "Invitation for Lunch Time Session",
        text: `
        Click here to join the session or create a new one :- 
        http://localhost:3000/home
        `
    };
    transporter.sendMail(mailOptions, (er,dt) => {
        if(er){
            return er;
        }
        else{
            return "Invitation sent"
        }
    });
}
const mail = async (req, res) => {
    userModel.find().then((resp1) => {
        if(resp1.length > 0){
            Promise.all(resp1.map((e) => {
                console.log(e.email);
                send(e.email);
            })).then((resp2) => {
                res.status(200).send("Namaste");
            }).catch((er2) => {
                res.status(500).send(er2);
            })
        }
    }).catch((er) => {
        console.log(er);
    })
}

module.exports = mail;