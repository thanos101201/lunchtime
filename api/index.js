const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
app.use(cors({
    origin: '*',
    methods: [
        'GET',
        'POST',
        'PUT',
        'DELETE'
    ]
}));
let db = "mongodb+srv://pratik:pratik@cluster0.37xuxek.mongodb.net/?retryWrites=true&w=majority";
const user = require('../Router/user');
const otp = require('../Router/otp');
const restaurant = require('../Router/restautrant');
const invitation = require('../Router/invite');
const gameSession = require('../Router/gamesession');
const polling = require('../Router/polling');
const getUsers = require('../Controller/user/getUsers');
const cron = require('node-cron');
const mail = require('../Controller/user/mails');
const userSessions = require('../Controller/user/sessions');
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected successfully");
}).catch((er) => {
    console.log(er);
});
app.use(express.json());
app.get('/cron', async(req, res) => {
    // cron.schedule('0 8 * * *', () => {
    //     mail();
    // });
    await mail();
    res.send("Namaste");
})
app.get('/', (req, res) => {
    res.send('Welcome!!');
});
app.get('/users', (req, res) => {
    getUsers(req, res);
});
app.get('/sesions/:id', (req,res) => {
    userSessions(req, res);
})
app.use('/user',(req, res) => {
    user(req, res);
});
app.use('/restaurant', (req, res) => {
    restaurant(req, res);
});
app.use('/otp', (req, res) => {
    otp(req, res);
});
app.use('/pool', (req, res) => {
    polling(req, res);
});
app.use('/invite', (req, res) => {
    invitation(req, res);
});
app.use('/session', (req, res) => {
    gameSession(req, res);
});
app.listen(3001, () => {
    console.log("Server started");
});