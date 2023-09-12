const userModel = require("../../models/user");

const post = (req, res) => {
    let userm = new userModel();
    console.log(req.body.email);
    userm.email = req.body.email;
    userm.username = req.body.username;
    userm.name = req.body.name;
    userm.goal = req.body.goal;
    userm.password = req.body.password;
    userm.save().then((resp1) => {
        console.log(resp1);
        res.status(200).send({
            'message': 'User added'
        });
    }).catch((er1) => {
        console.log(er1.message);
        res.status(400).send({
            'message': er1.message       
        });
    });
}

module.exports = post;