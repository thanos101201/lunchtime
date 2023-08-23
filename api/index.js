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
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected successfully");
}).catch((er) => {
    console.log(er);
});

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Welcome!!');
});
app.listen(3001, () => {
    console.log("Server started");
})