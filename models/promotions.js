const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const promoSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        trim: true
    },
    lable: {
        type: String,
        default: 'New'
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true
    }, 
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

let Promotions = mongoose.model('Promotion', promoSchema);
module.exports = Promotions;