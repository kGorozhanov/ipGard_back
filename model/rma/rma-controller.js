const Controller = require('../../lib/controller');
const Rma = require('./rma-facade');

class RmaController extends Controller {

    create(req, res, next) {
        var rma = req.body;
        rma._customerName = rma.customer.name;
        this.model.create(rma)
            .then(doc => res.status(201).json(doc))
            .catch(err => next(err));
    }

    find(req, res, next) {
        let options = {};
        if (req.query.sort) {
            if (req.query.sort.indexOf('customer.name') !== -1) {
                options.sort = req.query.sort.replace(/customer.name/, '_customerName')
            } else {
                options.sort = req.query.sort;
            }
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
                if (key === 'dateFrom') {
                    query.dateCreate = query.dateCreate || {};
                    query.dateCreate['$gte'] = req.query[key];
                } else if (key === 'dateTo') {
                    query.dateCreate = query.dateCreate || {};
                    query.dateCreate['$lte'] = req.query[key];
                } else if(key === 'customer.name') {
                    query._customerName = new RegExp(req.query[key], 'i');
                } else {
                    query[key] = new RegExp(req.query[key], 'i');
                }
            }
        }
        options.populate = [
            { path: 'products.sale' },
            { path: 'customer' },
            { path: 'products.fields.field' },
        ];
        return this.model.paginate(query, options)
            .then(collection => {
                return this.model
                    .populate(collection.docs, {
                        path: 'products.fields.field.type',
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

    findById(req, res, next) {
        return this.model.findById(req.params.id)
            .then(doc => this.model.populate(doc, { path: 'customer' }))
            .then(doc => this.model.populate(doc, { path: 'products.sale' }))
            .then(doc => this.model.populate(doc, { path: 'products.sale.customer', model: 'Customer' }))
            .then(doc => this.model.populate(doc, { path: 'products.fields.field' }))
            .then(doc => this.model.populate(doc, { path: 'products.fields.field.type', model: 'Type' }))
            .then(doc => {
                if (!doc) { return res.status(404).end(); }
                return res.status(200).json(doc);
            })
            .catch(err => next(err));
    }

    update(req, res, next) {
        const conditions = { _id: req.params.id };
        let rma = req.body;
        if(rma.customer) {
            rma._customerName = rma.customer.name;
        }
        this.model.update(conditions, rma)
            .then(doc => {
                if (!doc) { return res.status(404).end(); }
                return res.status(200).json(doc)
            })
            .catch(err => next(err));
    }

}

module.exports = new RmaController(Rma);