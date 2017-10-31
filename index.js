var express = require('express');
var app = express();
var multer = require('multer');
const cors = require('cors');
app.use(cors());

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() +'.html')
  }
})

var upload = multer({ storage: storage })

app.post('/upload', upload.single('html'), function (req, res) {
    if(req.file)
      res.send('uploaded')
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});