const Model = require('../../lib/facade');
const staticFieldSchema  = require('./static-field-schema');


class StaticFieldModel extends Model {}

module.exports = new StaticFieldModel(staticFieldSchema);