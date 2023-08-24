const invitationModel = require('../../models/invitation');

const post = (req, res) => {
    const to = req.body.to;
    const from = req.body.from;
    let invtm = new invitationModel();
    invtm.to = to;
    invtm.from = from;
    invtm.save().then((resp1) => {
        res.status(200).send({
            'message': 'Invitation send'
        });
    }).catch((er1) => {
        res.send(er1);
    });
}

module.exports = post;