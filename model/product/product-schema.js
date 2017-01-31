const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    model: String,
    partNumber: String,
    upc: String,
    description: String,
    serialNumber: String,
    dateCreate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);