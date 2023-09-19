const  { google } = require('googleapis');

const url = (req, res) => {
    // res.send("nam")
    const oauth2Client = new google.auth.OAuth2(
        "611658826728-gp7el8t7t63g46o807c6unjd99tfg4lm.apps.googleusercontent.com",
        "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",
        "http://localhost:3001/login"
        );
        
    const scopes = ["https://www.googleapis.com/auth/fitness.activity.read profile email openid", "https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/calendar.readonly", "https://www.googleapis.com/auth/calendar.events", "https://www.googleapis.com/auth/calendar.events"]
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
    })

    res.status(200).send({url});
    // request(url, (err, response, body) => {
    //     console.log("error ", err);
    //     console.log("statusCode: ", response && response.statusCode);
    //     res.send({url});
    // });
}

module.exports = url;