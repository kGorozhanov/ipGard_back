var Controller = require('../../lib/controller');
var Document = require('./document-facade');

class DocumentController extends Controller {
    find(req, res, next) {
        return this.model.find(req.query)
            .then(collection => this.model.populate(collection, { path: 'fields.field' }))
            .then(collection => this.model.populate(collection, { path: 'fields.field.type', model: 'Type' }))
            .then(collection => res.status(200).json(collection))
            .catch(err => next(err));
    }

    create(req, res, next) {
        this.model.create(req.body)
            .then(doc => this.model.populate(doc, { path: 'fields.field' }))
            .then(doc => this.model.populate(doc, { path: 'fields.field.type', model: 'Type' }))
            .then(doc => res.status(201).json(doc))
            .catch(err => next(err));
    }
}

module.exports = new DocumentController(Document);