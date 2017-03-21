const controller = require('./sale-controller');
const Router = require('express').Router;
const auth = require('../../auth/auth.service');
const router = new Router();
let accessToGet = ['admin', 'salesAdmin', 'salesUser', 'support'];
let accessToChange = ['admin', 'salesAdmin'];

router.get('/', auth.hasAnyRole(accessToGet), (...args) => controller.find(...args));
router.delete('/:id', auth.hasAnyRole(accessToChange), (...args) => controller.remove(...args));
router.put('/:id', auth.hasAnyRole(accessToChange), (...args) => controller.update(...args));
router.get('/:id', auth.hasAnyRole(accessToGet), (...args) => controller.findById(...args));
router.post('/', auth.hasAnyRole(accessToChange), (...args) => controller.create(...args));
router.post('/collection', auth.hasAnyRole(accessToChange), (...args) => controller.createCollection(...args));

module.exports = router;
