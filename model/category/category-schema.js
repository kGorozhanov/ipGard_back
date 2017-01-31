const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    title: { type: String, unique : true, required: true },
    production: { type: Boolean, default: false },
    sales: { type: Boolean, default: false },
    dateCreate: { type: Date, default: Date.now },
    published: { type: Boolean, default: false },
    type: {type: String, required: true, enum: ['Table', 'Form', 'Gallery']}
});

module.exports = mongoose.model('Category', categorySchema);