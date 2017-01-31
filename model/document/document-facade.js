const Model = require('../../lib/facade');
const documentSchema  = require('./document-schema');


class DocumentModel extends Model {}

module.exports = new DocumentModel(documentSchema);