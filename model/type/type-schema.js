const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const typeSchema = new Schema({
    label: String,
    value: String
});

module.exports = mongoose.model('Type', typeSchema);