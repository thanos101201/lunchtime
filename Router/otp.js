const router = require('express').Router();
const get = require('../Controller/otp/get');
const verify = require('../Controller/otp/verify');

router.get('/', (req, res) => {
    get(req, res);
});

router.post('/', (req, res) => {
    verify(req, res);
})

module.exports = router;