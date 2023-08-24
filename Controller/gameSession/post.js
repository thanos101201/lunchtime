const gameSessionModel = require('../../models/gameSession');
const post = (req, res) => {
    let gamem = new gameSessionModel();
    const user1 = req.body.user1;
    const user2 = req.body.user2;
}

module.exports = post;