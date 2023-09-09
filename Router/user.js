const express = require('express');
const get = require('../Controller/user/get');
const getUsers = require('../Controller/user/getUsers');
const post = require('../Controller/user/post');
const login = require('../Controller/user/login');
const router = express.Router();

router.get('/:email', (req, res) => {
    get(req, res);
});

router.get('/users',(req, res) => {
    getUsers(req, res);
})
router.post('/login', (req, res) => {
    login(req, res);
})
router.post('/', (req, res) => {
    post(req, res);
});

module.exports = router;