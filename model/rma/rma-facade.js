const Model = require('../../lib/facade');
const rmaSchema  = require('./rma-schema');


class RmaModel extends Model {
    paginate(query, options) {
        return this.Schema.paginate(query, options);
    }
}

module.exports = new RmaModel(rmaSchema);