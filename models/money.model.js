const mongoose = require('mongoose')
const { Schema } = mongoose

const moneySchema = new Schema({
    category: {
        type: String,
        required: true,
        enum: ['income', 'expense']
    },
    amount: {
        type: Number,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    }
}, { timestamps: true })

const MoneyTrack = mongoose.model('moneyTrack', moneySchema);
module.exports = MoneyTrack;