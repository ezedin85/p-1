const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//TODO-2 Make it strong schema [required, unique....]
const laptopSchema = new Schema({
    name: String,
    ram: Number,
    storage: Number,
    core: Number,
    add_desc: String,
    price: Number,
    messageId: String,
    caption: String,
    imagesUrl: [String],
    inStock: {
        type: Boolean,
        default: true
    },
}, { timestamps: true })

const Laptop = mongoose.model('Laptop', laptopSchema);


const recommendationSchema = new Schema({
    name: String,
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    username: String,
    ram: [Number],
    storage: [Number],
    core: [Number],
    price: [Number],
}, { timestamps: true })

const Recommendation = mongoose.model('Recommendation', recommendationSchema)

module.exports = {
    Laptop,
    Recommendation
}