const controller = require('./rma-controller');
const Router = require('express').Router;
const auth = require('../../auth/auth.service');
const router = new Router();
let accessToGet = ['admin', 'support'];
let accessToChange = ['admin', 'support'];

router.get('/', auth.hasAnyRole(accessToGet), (...args) => controller.find(...args));
router.delete('/:id', auth.hasAnyRole(accessToChange), (...args) => controller.remove(...args));
router.put('/:id', auth.hasAnyRole(accessToChange), (...args) => controller.update(...args));
router.get('/:id', auth.hasAnyRole(accessToGet), (...args) => controller.findById(...args));
router.post('/', auth.hasAnyRole(accessToChange), (...args) => controller.create(...args));

module.exports = router;
