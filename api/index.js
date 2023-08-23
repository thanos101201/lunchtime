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
let db = "";
const user = require('../Router/user');
const otp = require('../Router/otp');
const restaurant = require('../Router/restautrant');
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected successfully");
}).catch((er) => {
    console.log(er);
});
app.use('/user',(req, res) => {
    user(req, res);
});
app.use('/restaurant', (req, res) => {
    restaurant(req, res);
});
app.use('/otp', (req, res) => {
    otp(req, res);
});
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Welcome!!');
});
app.listen(3001, () => {
    console.log("Server started");
})