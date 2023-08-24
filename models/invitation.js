const mongoose = require('mongoose');

const invitationSchema = mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        from : {
            type: String,
            required: true
        }
    }
});

const invitationModel = mongoose.model('Invitation', invitationSchema);

module.exports = invitationModel;