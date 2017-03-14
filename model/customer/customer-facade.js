const Model = require('../../lib/facade');
const customerSchema  = require('./customer-schema');


class CustomerModel extends Model {
    paginate(query, options) {
        return this.Schema.paginate(query, options);
    }
}

module.exports = new CustomerModel(customerSchema);