var Controller = require('../../lib/controller');
var Sale = require('./sale-facade');
var Document = require('./../document/document-facade');
var async = require('async');

class SaleController extends Controller {

    find(req, res, next) {
        // let options = {};
        // if (req.query.sort) {
        //     options.sort = req.query.sort;
        //     delete req.query.sort;
        // }
        // if (req.query.page) {
        //     options.page = +req.query.page;
        //     delete req.query.page;
        // }
        // if (req.query.limit) {
        //     options.limit = +req.query.limit;
        //     delete req.query.limit;
        // }
        let query = {};
        if (req.query) {
            if (req.query.serialNumber) {
                query.serialNumber = new RegExp(req.query.serialNumber);
            }
            if (req.query.dateFrom) {
                query.date = query.date || {};
                query.date['$gte'] = req.query['dateFrom'];
            }
            if (req.query.dateTo) {
                query.date = query.date || {};
                query.date['$lte'] = req.query['dateTo'];
            }
            if (req.query.product) {
                query.product = req.query['product'];
            }
            if (req.query.salesOrder) {
                query.salesOrder = new RegExp(req.query['salesOrder'], 'i');
            }
            if (req.query.clientName) {
                query.clientName = new RegExp(req.query['clientName'], 'i');
            }
            // for (let key in req.query) {
            //     if (key === 'product') {
            //         query[key] = req.query[key];
            //     } else if (key === 'dateFrom') {
            //         query.date = query.date || {};
            //         query.date['$gte'] = req.query[key];
            //     } else if (key === 'dateTo') {
            //         query.date = query.date || {};
            //         query.date['$lte'] = req.query[key];
            //     } else {
            //         query[key] = new RegExp('^' + req.query[key]);
            //     }
            // }
        }
        // return this.model.paginate(query, options)
        //     .then(collection => res.status(200).json(collection))
        //     .catch(err => next(err));
        return this.model.find(query)
            .then(collection => this.model.populate(collection, { path: 'product' }))
            .then(collection => {
                if (req.query.model) {
                    let model = new RegExp(req.query.model, 'i');
                    collection = collection.filter(doc => model.test(doc.product.model));
                }
                if (req.query.partNumber) {
                    let partNumber = new RegExp(req.query.partNumber, 'i');
                    collection = collection.filter(doc => partNumber.test(doc.product.partNumber));
                }
                if (req.query.upc) {
                    let upc = new RegExp(req.query.upc, 'i');
                    collection = collection.filter(doc => upc.test(doc.product.upc));
                }
                if (req.query.description) {
                    let description = new RegExp(req.query.description, 'i');
                    collection = collection.filter(doc => description.test(doc.product.description));
                }
                if (req.query.sort) {
                    collection.sort((a, b) => {
                        let order;
                        let filter = req.query.sort;
                        if (filter.indexOf('-') === 0) {
                            filter = filter.slice(1);
                            order = false;
                        } else {
                            order = true;
                        }
                        filter = filter.split('.');
                        let copyA = a;
                        let copyB = b;
                        for (let i = 0; i < filter.length; i++) {
                            copyA = copyA[filter[i]];
                            copyB = copyB[filter[i]];
                        }
                        copyA = copyA.toLowerCase();
                        copyB = copyB.toLowerCase();
                        if (copyA < copyB) {
                            return order ? -1 : 1;
                        }
                        if (copyA > copyB) {
                            return order ? 1 : -1;
                        }
                        return 0;
                    })
                }
                let pagination = {
                    total: collection.length,
                    limit: +req.query.limit || 10
                };
                let page = +req.query.page || 1;
                if (!pagination.total) {
                    pagination.page = 1;
                    pagination.docs = [];
                } else if (Math.ceil(collection.length / pagination.limit) >= page) {
                    pagination.docs = collection.splice(pagination.limit * (page - 1), pagination.limit);
                    pagination.page = page;
                } else {
                    pagination.page = 1;
                    pagination.docs = collection;
                }

                res.status(200).json(pagination);
            })
            .catch(err => next(err));
    }
}

module.exports = new SaleController(Sale);