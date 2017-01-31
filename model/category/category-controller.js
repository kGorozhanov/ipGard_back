var Controller = require('../../lib/controller');
var Category = require('./category-facade');
var Field = require('./../field/field-facade');
var Document = require('./../document/document-facade');
var Type = require('./../type/type-facade');
var mongoose = require('mongoose');
var async = require('async');

class CategoryController extends Controller {
    find(req, res, next) {
        let query = {};
        if (req.query) {
            for (let key in req.query) {
                query[key] = new RegExp('^' + req.query[key]);
            }
        }
        return this.model.find(query)
            .then(collection => {
                let role = req.user.role
                if (role !== 'admin') {
                    let key = role.indexOf('production') === -1 ? 'sales' : 'production';
                    let filteredCollection = collection.filter(item => item[key] && item.published);
                    res.status(200).json(filteredCollection);
                } else {
                    res.status(200).json(collection)
                }
            })
            .catch(err => next(err));
    }

    findById(req, res, next) {
        return this.model.findById(req.params.id)
            .then(doc => {
                if (!doc) { return res.status(404).end(); }
                if(req.user.role !== 'admin' && (req.user.role.indexOf('production') === 0 && !doc.production || req.user.role.indexOf('sales') === 0 && !doc.sales)) {
                    return res.status(401).end();
                }
                return res.status(200).json(doc);
            })
            .catch(err => next(err));
    }

    create(req, res, next) {
        this.model.create(req.body)
            .then(doc => {
                if (doc.type === 'Gallery') {
                    Type.findOne({ value: 'img' })
                        .then(type => {
                            var field = {
                                title: 'Image',
                                required: true,
                                category: doc,
                                type: type
                            }
                            Field.create(field)
                                .then(field => res.status(201).json(doc));
                        });
                } else {
                    res.status(201).json(doc)
                }
            })
            .catch(err => next(err));
    }

    remove(req, res, next) {
        this.model.remove(req.params.id)
            .then(doc => {
                if (!doc) { return res.status(404).end(); }
                async.parallel([
                    (cb) => {
                        Field.find({ category: doc._id })
                            .then(fields => {
                                async.eachSeries(fields, (field, asyncdone) => {
                                    Field.remove(field._id)
                                        .then(res => asyncdone())
                                        .catch(err => asyncdone(null, err));
                                }, cb);
                            });
                    },
                    (cb) => {
                        Document.find({ category: doc._id })
                            .then(documents => {
                                async.eachSeries(documents, (document, asyncdone) => {
                                    Document.remove(document._id)
                                        .then(res => asyncdone())
                                        .catch(err => asyncdone(null, err));
                                }, cb);
                            });
                    }
                ], () => {
                    return res.status(204).end();
                })
            })
            .catch(err => next(err));
    }
}
module.exports = new CategoryController(Category);