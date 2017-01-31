var Controller = require('../../lib/controller');
var Type = require('./type-facade');

class TypeController extends Controller {}

module.exports = new TypeController(Type);