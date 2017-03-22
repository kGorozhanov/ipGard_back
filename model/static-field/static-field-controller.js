var Controller = require('../../lib/controller');
var StaticField = require('./static-field-facade');
const mongoose = require('mongoose');
var async = require('async');

class StaticFieldController extends Controller {
    find(req, res, next) {
        return this.model.find(req.query)
            .then(collection => this.model.populate(collection, { path: 'type' }))
            .then(collection => res.status(200).json(collection))
            .catch(err => next(err));
    }

    create(req, res, next) {
        this.model.create(req.body)
            .then(doc => this.model.populate(doc, { path: 'type' }))
            .then(doc => {
                return mongoose.model(doc.model).find({})
                    .then(documents => {
                        if (doc.model !== 'Rma') {
                            return async.eachSeries(documents, (document, asyncdone) => {
                                document.fields.push({
                                    field: doc,
                                    value: null
                                });
                                document.save()
                                    .then(result => asyncdone())
                                    .catch(err => asyncdone(null, err));
                            }, (err) => {
                                if (err) next(err);
                                res.status(201).json(doc)
                            });
                        } else {
                            return async.eachSeries(documents, (document, asyncdone) => {
                                document.products.forEach(product => {
                                    product.fields.push({
                                        field: doc,
                                        value: null
                                    });
                                });
                                document.save()
                                        .then(result => asyncdone())
                                        .catch(err => asyncdone(null, err));
                            }, (err) => {
                                if (err) next(err);
                                res.status(201).json(doc)
                            });
                        }
                    })
            })
            .catch(err => next(err));
    }

    remove(req, res, next) {
        this.model.remove(req.params.id)
            .then(doc => {
                if (!doc) { return res.status(404).end(); }
                mongoose.model(doc.model).find({})
                    .then(documents => {
                        if (doc.model === 'Rma') {
                            return async.eachSeries(documents, (document, asyncdone) => {
                                document.products.forEach(product => {
                                    for (var i = 0; i < product.fields.length; i++) {
                                        if (product.fields[i].field.equals(doc._id)) {
                                            product.fields.splice(i, 1);
                                            break;
                                        }
                                    }
                                })
                                mongoose.model(doc.model).update({ _id: document._id }, document)
                                    .then(result => asyncdone())
                                    .catch(err => asyncdone(null, err));
                            }, (err) => {
                                if (err) next(err)
                                return res.status(204).end();
                            });
                        } else {
                            return async.eachSeries(documents, (document, asyncdone) => {
                                for (var i = 0; i < document.fields.length; i++) {
                                    if (document.fields[i].field.equals(doc._id)) {
                                        document.fields.splice(i, 1);
                                        break;
                                    }
                                }
                                mongoose.model(doc.model).update({ _id: document._id }, document)
                                    .then(result => asyncdone())
                                    .catch(err => asyncdone(null, err));
                            }, (err) => {
                                if (err) next(err)
                                return res.status(204).end();
                            });
                        }
                    })
            })
            .catch(err => next(err));
    }
}

module.exports = new StaticFieldController(StaticField);