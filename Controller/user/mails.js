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
const mail = async () => {
    userModel.find().then((resp1) => {
        if(resp1.length > 0){
            resp1.map((e) => {
                console.log(e.email);
                send(e.email);
            })
        }
    }).catch((er) => {
        console.log(er);
    })
}

module.exports = mail;