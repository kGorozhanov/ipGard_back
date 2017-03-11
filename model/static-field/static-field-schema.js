const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Type = require('../type/type-schema');

const staticFieldSchema = new Schema({
    title: String,
    required: Boolean,
    model: {type: String, required: true},
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Type' },
    options: [String]
});

module.exports = mongoose.model('StaticField', staticFieldSchema);