const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    username: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    created: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("Users", usersSchema);