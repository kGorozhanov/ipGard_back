const Model = require('../../lib/facade');
const typeSchema  = require('./type-schema');


class TypeModel extends Model {}

module.exports = new TypeModel(typeSchema);