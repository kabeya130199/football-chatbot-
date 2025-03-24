const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AppearanceSchema = new Schema({

    bgColor: {
        type: String,
        maxlength: 50
    },

    onlineStatus: {
        type: String,
        required: true,
        maxlength: 50
    },

    status: {
        type: String,
        required: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
    },
    botName: {
        type: String,
        required: true,
    },
    labelText: {
        type: String,
        required: true
    },
    uuid: {
        type: String,
        required: true
    }, 
    foreColor: {
        type: String,
        required: true
    }
});

/* module.exports = {
        UserSchema: mongoose.model("mongodb table name", schema name)
   }
   if mongodb table name == "User"
   then mongodb creates table named "users"
*/

module.exports = {
    AppearanceSchema: mongoose.model("Appearance", AppearanceSchema),
}