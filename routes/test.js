var express = require('express');
const router = express.Router();
var multer = require('multer');

var testController = require('../controllers/test')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() +'.html')
    }
  })
var upload = multer({ storage: storage })

router.get('/tests', testController.allTests)
router.post('/upload', upload.single('html'), testController.upload)

module.exports = router;