const controller = require('./sale-controller');
const Router = require('express').Router;
const auth = require('../../auth/auth.service');
const router = new Router();
let accessToGet = ['admin', 'salesAdmin', 'salesUser'];
let accessToChange = ['admin', 'salesAdmin'];

router.get('/', auth.hasAnyRole(accessToGet), (...args) => controller.paginate(...args));
router.delete('/:id', auth.hasAnyRole(accessToChange), (...args) => controller.remove(...args));
router.put('/:id', auth.hasAnyRole(accessToChange), (...args) => controller.update(...args));
router.get('/:id', auth.hasAnyRole(accessToGet), (...args) => controller.findById(...args));
router.post('/', auth.hasAnyRole(accessToChange), (...args) => controller.create(...args));

module.exports = router;
