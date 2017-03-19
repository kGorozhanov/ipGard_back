const Controller = require('../../lib/controller');
const Sale = require('./sale-facade');
const Document = require('./../document/document-facade');
const Product = require('./../product/product-facade');
const async = require('async');

class SaleController extends Controller {

    create(req, res, next) {
        let sale = req.body;
        Product.findById(sale.product)
            .then(product => {
                sale._productModel = product.model;
                sale._productPartNumber = product.partNumber;
                sale._productUpc = product.upc;
                sale._productDescription = product.description;
                if (sale.customer) {
                    sale._customerName = sale.customer.name;
                }
                return this.model.create(sale)
            })
            .then(doc => res.status(201).json(doc))
            .catch(err => next(err));
    }

    createCollection(req, res, next) {
        Product.findById(req.body[0].product)
            .then(product => {
                let collection = req.body.map((sale) => {
                    sale._productModel = product.model;
                    sale._productPartNumber = product.partNumber;
                    sale._productUpc = product.upc;
                    sale._productDescription = product.description;
                    if (sale.customer) {
                        sale._customerName = sale.customer.name;
                    }
                    return sale;
                });
                return this.model.createCollection(collection)
            })
            .then(doc => res.status(201).json(doc))
            .catch(err => next(err));
    }

    find(req, res, next) {
        let options = {};
        options.populate = [
            { path: 'product' },
            { path: 'customer' },
            { path: 'fields.field' }
        ];
        if (req.query.sort) {
            if (req.query.sort.indexOf('product.model') !== -1) {
                options.sort = req.query.sort.replace(/product.model/, '_productModel')
            } else if (req.query.sort.indexOf('product.partNumber') !== -1) {
                options.sort = req.query.sort.replace(/product.model/, '_productPartNumber')
            } else if (req.query.sort.indexOf('product.upc') !== -1) {
                options.sort = req.query.sort.replace(/product.upc/, '_productUpc')
            } else if (req.query.sort.indexOf('product.description') !== -1) {
                options.sort = req.query.sort.replace(/product.description/, '_productDescription')
            } else if (req.query.sort.indexOf('customerName') !== -1) {
                options.sort = req.query.sort.replace(/customerName/, '_customerName');
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
                if (key === 'product') {
                    query[key] = req.query[key];
                } else if (key === 'model') {
                    query['_productModel'] = new RegExp(req.query[key], 'i');
                } else if (key === 'partNumber') {
                    query['_productPartNumber'] = new RegExp(req.query[key], 'i');
                } else if (key === 'upc') {
                    query['_productUpc'] = new RegExp(req.query[key], 'i');
                } else if (key === 'description') {
                    query['_productDescription'] = new RegExp(req.query[key], 'i');
                } else if (key === 'customerName') {
                    query['_customerName'] = new RegExp(req.query[key], 'i');
                } else if (key === 'dateFrom') {
                    query.date = query.date || {};
                    query.date['$gte'] = req.query[key];
                } else if (key === 'dateTo') {
                    query.date = query.date || {};
                    query.date['$lte'] = req.query[key];
                } else {
                    query[key] = new RegExp(req.query[key], 'i');
                }
            }
        }
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
        let sale = req.body;
        if(sale.customer) {
            sale._customerName = sale.customer.name;
        }
        this.model.update(conditions, sale)
            .then(doc => {
                if (!doc) { return res.status(404).end(); }
                return res.status(200).json(doc)
            })
            .catch(err => next(err));
    }
}

module.exports = new SaleController(Sale);