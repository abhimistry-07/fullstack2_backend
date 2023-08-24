const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: String,
    avatar: String,
    email: String,
    password: String
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = { UserModel }; 