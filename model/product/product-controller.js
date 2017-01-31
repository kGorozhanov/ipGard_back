var Controller = require('../../lib/controller');
var Product = require('./product-facade');
var Document = require('./../document/document-facade');
var async = require('async');

class ProductController extends Controller {
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