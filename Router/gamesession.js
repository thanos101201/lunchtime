const express = require('express');
const router = express.Router();
const get = require('../Controller/gameSession/get');
const post = require('../Controller/gameSession/post');
const put = require('../Controller/gameSession/put');
const getActiveSession = require('../Controller/gameSession/getActiveSession');
const join = require('../Controller/gameSession/joinSession');
const questions = require('../Controller/gameSession/questions');
const invite = require('../Controller/gameSession/invite');
router.get('/', (req, res) => {
    get(req, res);
});
router.post('/', (req, res) => {
    post(req, res);
});
router.get('/active/:user', (req, res) => {
    getActiveSession(req, res);
});
router.post('/join', (req, res) => {
    join(req, res);
});
router.put('/', (req, res) => {
    put(req, res);
});
router.get('/question/:id', (req, res) => {
    questions(req,res);
});
router.post('/invite', (req, res) => {
    invite(req, res);
});
module.exports = router;