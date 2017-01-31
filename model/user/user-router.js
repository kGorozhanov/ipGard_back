const controller = require('./user-controller');
const Router = require('express').Router;
const auth = require('../../auth/auth.service');
const router = new Router();
const admins = ['admin', 'productionAdmin', 'salesAdmin'];


router.get('/', auth.hasAnyRole(admins), controller.index);
router.delete('/:id', auth.hasAnyRole(admins), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id', auth.isAuthenticated(), controller.updateUser);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.hasAnyRole(admins), controller.create);

module.exports = router;
