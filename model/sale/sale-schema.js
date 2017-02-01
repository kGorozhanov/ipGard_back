const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Product = require('./../product/product-schema');
const Schema = mongoose.Schema;

const saleSchema = new Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    clientName: {type: String, required: true},
    serialNumber: {type: String, required: true},
    salesOrder: {type: String, required: true},
    date: {type: Date, required: true},
    dateCreate: { type: Date, default: Date.now }
});

saleSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Sale', saleSchema);