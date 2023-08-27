const express = require('express');
const post = require('../Controller/polling/post');
const router = express.Router();
router.post('/', (req, res) => {
    post(req, res);
});

module.exports = router;