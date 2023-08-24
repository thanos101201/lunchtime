const invitationModel = require('../../models/invitation');

const get = (req, res) => {
    const user = req.params.user;
    invitationModel.find({
        to: user
    }).then((resp1) => {
        res.status(200).send({
            'message': 'Invitations are here',
            'data': resp1
        });
    }).catch((er1) => {
        res.send(er1);
    });
}

module.exports = get;