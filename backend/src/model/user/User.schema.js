const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    // name: {
    //     type: String,
    //     required: true,
    //     maxlength: 50
    // },
    website: {
        type: String,
        required: true,
        maxlength: 50
    },
    // phone: {
    //     type: Number,
    //     maxlength: 11
    // },
    email: {
        type: String,
        required: true,
        maxlength: 50
    },
    // address: {
    //     type: String,
    //     maxlength: 100
    // },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 100
    },
    refreshJWT: {
        token: {
            type: String,
            maxlength: 500,
            default: "",
        },
        addedAt: {
            type: Date,
            required: true,
            default: Date.now(),
        },
    },
});

/* module.exports = {
        UserSchema: mongoose.model("mongodb table name", schema name)
   }
   if mongodb table name == "User"
   then mongodb creates table named "users"
*/

module.exports = {
    UserSchema: mongoose.model("User", UserSchema),
}