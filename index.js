var express = require('express');
var app = express();
var multer = require('multer');
const cors = require('cors');
app.use(cors());
var fs = require('fs');
var cheerio = require('cheerio');

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
      fs.readFile(req.file.path, 'utf8', function(err, data) {
        $ = cheerio.load(data);
    
        var allQuestions = $('.que.correct');
        allQuestions.each(function(){
            //вопрос
            var q = $('.qtext', this).text();//вопрос
            var a = $('.answer .correct label', this).text();//ответ
            console.log($(this).attr("id"))
            console.log(q);
            console.log(a);
          })
        console.log("Верных ответов: " + allQuestions.length)
    })
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});