let express = require('express');
let superagent = require('superagent');
let cheerio = require('cheerio');
let app = express();
app.get('/',function (req,res,next) {
    superagent.get('https://cnodejs.org/')
        .end(function (err,sres) {
            if (err) {
                return next(err);
            }
            let $ = cheerio.load(sres.text);
            let items = [];
            $('#topic_list .topic_title').each(function (idx, element) {
                let $element = $(element);
                items.push({
                    title: $element.attr('title'),
                    href: $element.attr('href')
                });
            });
            res.send(items);
        });
});