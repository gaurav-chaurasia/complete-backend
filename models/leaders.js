const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const leaderSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        trim: true
    },
    designation: {
        type: String,
        required: true
    },
    abbr: {
        type: String,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    }, 
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

let Leaders = mongoose.model('Leader', leaderSchema);
module.exports = Leaders;