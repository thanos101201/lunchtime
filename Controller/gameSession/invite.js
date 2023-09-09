const nodemailer = require('nodemailer');
const invite = (req, res) => {
    const user1 = req.body.user1;
    const user2 = req.body.user2;
    const email = req.body.email;
    const sessionId = req.body.sessionId;
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
        ${user1} has invited you for Lunch Time Game Session
        The session Id is ${sessionId}
        Click here to join the session :- 
        http://localhost:3000
        `
    };
    transporter.sendMail(mailOptions, (er, dt) => {
        if(er){
            res.send(er);
        }
        else{
            res.status(200).send({
                'message': 'Invitation sent'
            })
        }
    });
}

module.exports = invite;