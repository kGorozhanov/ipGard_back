const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const StaticField = require('../static-field/static-field-schema');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: true },
    phone: { type: String, required: true },
    contactPerson: { type: String, required: true },
    email: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    salesRep: { type: String, default: '' },
    dateCreate: { type: Date, default: Date.now },
    fields: [{
        field: { type: mongoose.Schema.Types.ObjectId, ref: 'StaticField' },
        value: mongoose.Schema.Types.Mixed
    }]
});

customerSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Customer', customerSchema);