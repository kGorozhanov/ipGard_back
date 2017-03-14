const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
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
    dateCreate: { type: Date, default: Date.now }
});

customerSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Customer', customerSchema);