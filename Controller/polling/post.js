var pollingModel = require('../../models/polling');

const add = (req, res) => {
    const username = req.body.username;
    pollingModel.find().then((resp1) => {
        let g = resp1
        g.push(username);
        pollingModel.updateOne({
            date: new Date().getDate()
        }, {
            pollarr : g
        }).then((resp1) => {
            res.status(200).send({
                'message': 'Added for pool'
            })
        }).catch((er1) => {
            res.send(er1);
        })
    }).catch((er1) => {
        res.send(er1);
    })
}

module.exports = add;
