const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Field = require('../field/field-schema');

const categorySchema = new Schema({
    title: { type: String, unique : true, required: true },
    production: { type: Boolean, default: false },
    sales: { type: Boolean, default: false },
    dateCreate: { type: Date, default: Date.now },
    published: { type: Boolean, default: false },
    type: {type: String, required: true, enum: ['Table', 'Attachments', 'Gallery', 'Table with subcategory']},
    relatedCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    subcategoryField: { type: mongoose.Schema.Types.ObjectId, ref: 'Field', required: false}
});

module.exports = mongoose.model('Category', categorySchema);