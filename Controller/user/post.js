const userModel = require("../../models/user");

const post = (req, res) => {
    let userm = new userModel();
    userm.email = req.body.email;
    userm.username = req.body.username;
    userm.name = req.body.name;
    userm.goal = req.body.goal;
    userm.save().then((resp1) => {
        res.status(200).send({
            'message': 'User added'
        });
    }).catch((er1) => {
        res.send(er1);
    });
}

module.exports = post;