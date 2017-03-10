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
        // if (query.serialNumber) {
        //     return Sale.findOne({serialNumber: query.serialNumber})
        //         .then(sale => {
        //             if(!sale) {
        //                 return {
        //                     docs: [],
        //                     total: 0,
        //                     limit: options.limit,
        //                     page: 1,
        //                     pages: 1
        //                 }
        //             }
        //             return this.model.paginate({_id: sale.product}, options)
        //         })
        //         .then(collection => res.status(200).json(collection))
        //         .catch(err => next(err));
        // } else {
        //     return this.model.paginate(query, options)
        //         .then(collection => res.status(200).json(collection))
        //         .catch(err => next(err));
        // }
    }

    remove(req, res, next) {
        this.model.remove(req.params.id)
            .then(doc => {
                if (!doc) { return res.status(404).end(); }
                Document.find({ product: doc._id })
                    .then(documents => {
                        async.eachSeries(documents, (document, asyncdone) => {
                            Document.remove(document._id)
                                .then(res => asyncdone())
                                .catch(err => asyncdone(null, err));
                        }, () => {
                            return res.status(204).end();
                        });
                    });
            })
            .catch(err => next(err));
    }
}

module.exports = new ProductController(Product);