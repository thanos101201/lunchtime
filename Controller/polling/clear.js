const pollingModel = require('../../models/polling');

const clear = () => {
    pollingModel.deleteMany().then((resp1) => {
        resp1.status(200).send({
            'message': 'poll is cleared'
        });
    }).catch((er1) => {
        res.send(er1);
    })
}

module.exports = clear;