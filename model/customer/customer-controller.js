const Controller = require('../../lib/controller');
const Customer = require('./customer-facade');
const Sale = require('./../sale/sale-facade');

class CustomerController extends Controller {

    find(req, res, next) {
        let options = {};
        if (req.query.sort) {
            options.sort = req.query.sort;
            delete req.query.sort;
        }
        if (req.query.page) {
            options.page = +req.query.page;
            delete req.query.page;
        }
        if (req.query.limit) {
            options.limit = +req.query.limit;
            delete req.query.limit;
        }
        let query = {};
        if (req.query) {
            for (let key in req.query) {
                query[key] = new RegExp(req.query[key], 'i');
            }
        }
        options.populate = [
            { path: 'fields.field' },
        ];
        return this.model.paginate(query, options)
            .then(collection => {
                return this.model.populate(collection.docs, { 
                    path: 'fields.field.type', 
                    model: 'Type' 
                })
                .then(docs => {
                    collection.docs = docs;
                    return collection;
                });
            })
            .then(collection => res.status(200).json(collection))
            .catch(err => next(err));
    }

    update(req, res, next) {
        const conditions = { _id: req.params.id };

        this.model.update(conditions, req.body)
            .then(doc => {
                if (!doc) { return res.status(404).end(); }
                return this.model.findById(req.params.id)
            })
            .then(customer => {
                let body = {
                    _customerName: customer.name
                };
                return Sale.update({ customer: customer._id }, body)
                    .then(() => customer);
            })
            .then(doc => res.status(200).json(doc))
            .catch(err => next(err));
    }

    remove(req, res, next) {
        this.model.remove(req.params.id)
            .then(doc => {
                if (!doc) { return res.status(404).end(); }
                return Sale.update({ customer: doc._id }, { _customerName: '', customer: null})
            })
            .then(() => res.status(204).end())
            .catch(err => next(err));
    }
}

module.exports = new CustomerController(Customer);