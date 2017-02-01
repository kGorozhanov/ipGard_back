const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    model: String,
    partNumber: String,
    upc: String,
    description: String,
    dateCreate: { type: Date, default: Date.now }
});

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', productSchema);