var Test = require('../models/test');

exports.allTests = function(req, res) {
  Test.find()
    .then(results => res.json(results)) 
    .catch(e => next(e));
}

exports.upload = function(req, res) {
    var fs = require('fs');
    var cheerio = require('cheerio');
        //проверка на наличие файла от клиента
        if(req.file) {
          //parse
            fs.readFile(req.file.path, 'utf8', function(err, data) {
                $ = cheerio.load(data);
                var allQuestions = $('.que.correct');
                allQuestions.each(function() {
                    //вопрос
                    var q = $('.qtext', this).text();//вопрос
                    var a = $('.answer .correct label', this).text();//ответ

                    Test.find({question: q}, {$exists: true}, function(err, result) {
                        if(result.length==0){
                            var test = new Test({ 
                                question: q,
                                answer: a
                                })
                                test.save();
                            }
                    })
                    //console.log($(this).attr("id"))
                    //console.log(q);
                    //console.log(a);
                })
            //console.log("Верных ответов: " + allQuestions.length)
            fs.unlinkSync(req.file.path)
            res.json({"message": "Ответы успешно добавлены"})
        })
      }else{
        res.json({"message": "Файл не выбран"})
      }
}