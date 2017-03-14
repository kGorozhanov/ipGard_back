var Controller = require('../../lib/controller');
var Product = require('./product-facade');
var Document = require('./../document/document-facade');
var Sale = require('./../sale/sale-facade');
var async = require('async');

class ProductController extends Controller {

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
        return this.model.paginate(query, options)
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
            .then(product => {
                let body = {
                    _productModel: req.body.model,
                    _productPartNumber: req.body.partNumber,
                    _productUpc: req.body.upc,
                    _productDescription: req.body.description
                };
                return Sale.update({ product: product._id }, body)
                    .then(() => product);
            })
            .then(doc => res.status(200).json(doc))
            .catch(err => next(err));
    }

    remove(req, res, next) {
        this.model.remove(req.params.id)
            .then(doc => {
                if (!doc) { return res.status(404).end(); }
                return Document.removeCollection({ product: doc._id })
                    .then(() => doc);
            })
            .then(doc => Sale.removeCollection({ product: doc._id }))
            .then(() => res.status(204).end())
            .catch(err => next(err));
    }
}

module.exports = new ProductController(Product);