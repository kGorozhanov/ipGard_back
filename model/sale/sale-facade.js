const Model = require('../../lib/facade');
const saleSchema  = require('./sale-schema');


class SaleModel extends Model {
    paginate(query, options) {
        return this.Schema.paginate(query, options);
    }
}

module.exports = new SaleModel(saleSchema);