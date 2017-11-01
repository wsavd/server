var express = require('express');
var app = express();
var multer = require('multer');
const cors = require('cors');
app.use(cors());
var fs = require('fs');
var cheerio = require('cheerio');
/* db */
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
app.set('database', (process.env.MONGODB_URI || 'mongodb://admin:qwerty123__@ds123725.mlab.com:23725/testdb3432'));
mongoose.connect(app.get('database'))
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));
var Test = require('./models/test')

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
    //проверка на наличие файла
    if(req.file) {
      //parse
      fs.readFile(req.file.path, 'utf8', function(err, data) {
        $ = cheerio.load(data);
        var allQuestions = $('.que.correct');
        allQuestions.each(function() {
            //вопрос
            var q = $('.qtext', this).text();//вопрос
            var a = $('.answer .correct label', this).text();//ответ
            //console.log($(this).attr("id"))
            console.log(q);
            console.log(a);
            
            var test = new Test({ 
              question: q,
              answer: a
            })
            test.save(function(err, result){
              console.log(result)
            })
        })

        console.log("Верных ответов: " + allQuestions.length)
        fs.unlinkSync(req.file.path)
    })
  }else{
    console.log("no file")
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});