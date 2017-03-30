const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Product = require('./../product/product-schema');
const Customer = require('./../customer/customer-schema');
const StaticField = require('../static-field/static-field-schema');
const Schema = mongoose.Schema;

const saleSchema = new Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    _productModel: { type: String, required: true },
    _productPartNumber: { type: String, required: true },
    _productUpc: { type: String, required: true },
    _productDescription: { type: String, required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    _customerName: {type: String, required: false, default: ''},
    serialNumber: {type: String, required: true, default: '', unique: true},
    salesOrder: {type: String, required: false, default: ''},
    version: { type: String, required: true },
    date: {type: Date, required: false},
    dateCreate: { type: Date, default: Date.now },
    fields: [{
        field: { type: mongoose.Schema.Types.ObjectId, ref: 'StaticField' },
        value: mongoose.Schema.Types.Mixed
    }]
});

saleSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Sale', saleSchema);