const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

// only
const genders = [
    'male',
    'female',
    'trans',
    'agender',
    'other'
];

const User = new Schema({
    admin: {
        type: Boolean,
        default: false
    },
    gender: {
        type: String,
        required: true,
        enum: genders
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);