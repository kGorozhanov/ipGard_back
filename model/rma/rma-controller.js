const Controller = require('../../lib/controller');
const Rma = require('./rma-facade');

class RmaController extends Controller {

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
            { path: 'products.sale' },
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
            .then(doc => this.model.populate(doc, { path: 'products.fields.field' }))
            .then(doc => this.model.populate(doc, { path: 'products.fields.field.type' }))
            .then(doc => {
                if (!doc) { return res.status(404).end(); }
                return res.status(200).json(doc);
            })
            .catch(err => next(err));
    }

}

module.exports = new RmaController(Rma);