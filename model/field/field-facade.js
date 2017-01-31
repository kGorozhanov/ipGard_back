const Model = require('../../lib/facade');
const fieldSchema  = require('./field-schema');


class FieldModel extends Model {}

module.exports = new FieldModel(fieldSchema);