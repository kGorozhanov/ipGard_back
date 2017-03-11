const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Product = require('./../product/product-schema');
const Schema = mongoose.Schema;

const saleSchema = new Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    clientName: {type: String, required: false},
    serialNumber: {type: String, required: true},
    salesOrder: {type: String, required: false},
    date: {type: Date, required: false},
    dateCreate: { type: Date, default: Date.now }
});

saleSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Sale', saleSchema);