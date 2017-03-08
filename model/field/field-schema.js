const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Type = require('../type/type-schema');
const Category = require('../category/category-schema');

const fieldSchema = new Schema({
    title: String,
    required: Boolean,
    useAsSubcategory: { type: Boolean, default: false },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Type' },
    options: [String]
});

module.exports = mongoose.model('Field', fieldSchema);