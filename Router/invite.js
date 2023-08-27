const express = require('express');
const router = express.Router();
const accept = require('../Controller/invitation/accept');
const get = require('../Controller/invitation/get');
const post = require('../Controller/invitation/post');
router.get('/', (req, res) => {
    get(req, res);
});

router.post('/', (req, res) => {
    post(req, res);
});

router.post('/accept', (req, res) => {
    accept(req, res);
});

module.exports = router