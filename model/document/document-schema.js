const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Field = require('../field/field-schema');
const Product = require('../product/product-schema');
const Category = require('../category/category-schema');

const documentSchema = new Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    subcategoryField: { type: String, required: false },
    fields: [{
        field: { type: mongoose.Schema.Types.ObjectId, ref: 'Field' },
        value: mongoose.Schema.Types.Mixed
    }]
});

module.exports = mongoose.model('Document', documentSchema);