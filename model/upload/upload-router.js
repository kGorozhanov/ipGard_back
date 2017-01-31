const Router = require('express').Router;
const auth = require('../../auth/auth.service');
const router = new Router();
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

var storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
})

var upload = multer({ storage: storage })

router.post('/', upload.single('file'), function (req, res) {
    res.status(200).json(req.file);
});

module.exports = router;
