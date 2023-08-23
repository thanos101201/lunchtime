const router = require('express').Router();
const get = require('../Controller/restaurant/get');
const post = require('../Controller/restaurant/post');
router.get('/', (req, res) => {
    get(req, res);
});

router.post('/' ,(req, res) => {
    post(req, res);
})

module.exports = router;