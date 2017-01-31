const Model = require('../../lib/facade');
const categorySchema  = require('./category-schema');


class CategoryModel extends Model {}

module.exports = new CategoryModel(categorySchema);