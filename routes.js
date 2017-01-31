const express = require('express');
const Router = require('express').Router;
const router = new Router();

const user = require('./model/user/user-router');
const product = require('./model/product/product-router');
const category = require('./model/category/category-router');
const field = require('./model/field/field-router');
const type = require('./model/type/type-router');
const document = require('./model/document/document-router');
const upload = require('./model/upload/upload-router');
// const auth = require('./auth/auth.service');


// router.route('/').get((req, res) => {
//   res.json({ message: 'Welcome to api API!' });
// });

router.use('/upload', upload);

router.use('/uploads', express.static('./uploads'))

router.use('/auth', require('./auth'));

router.use('/users', user);

router.use('/products', product);

router.use('/categories', category);

router.use('/fields', field);

router.use('/types', type);

router.use('/documents', document);

module.exports = router;
