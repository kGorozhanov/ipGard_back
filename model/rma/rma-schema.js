const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const StaticField = require('../static-field/static-field-schema');
const Customer = require('../customer/customer-schema');
const Sale = require('../sale/sale-schema');
const Schema = mongoose.Schema;

const rmaSchema = new Schema({
    formNumber: {type: String, required: true},
    rxCarrier: {type: String, default: ''},
    rxTracking: {type: String, default: ''},
    description: {type: String, default: ''},
    customer: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true},
    products: [{
        sale: {type: mongoose.Schema.Types.ObjectId, ref: 'Sale', required: true},
        fields: [{
            field: {type: mongoose.Schema.Types.ObjectId, ref: 'StaticField'},
            value: mongoose.Schema.Types.Mixed
        }]
    }],
    dateCreate: {type: Date, default: Date.now}
});

rmaSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Rma', rmaSchema);