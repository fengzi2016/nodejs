let eventproxy = require('eventproxy');
let surperagent = require('superagent');
let cheerio = require('cheerio');
let url = require('url');
let cnodeUrl = 'https://cnodejs.org/';
surperagent.get(cnodeUrl)
    .end(function (err,res) {
        if(err){
            return console.error(err);
        }
        let topicUrls =[];
        let $ =cheerio.load(res.text);
        $('#topic_list .topic_title').each(function (idx,element) {
            let $element = $(element);
            let href = url.resolve(cnodeUrl,$element.attr('href'));
            topicUrls.push(href);
        });
        let ep = new eventproxy();
        ep.after('topic_html',topicUrls.length,function (topics) {
            topics = topics.map(function (topicPair) {
                let topicUrl = topicPair[0];
                let topicHtml = topicPair[1];
                let $ = cheerio.load(topicHtml);
                return ({
                    title: $('.topic_full_title').text().trim(),
                    href: topicUrl,
                    conmment1: $('.reply_content').eq(0).text().trim()
                });
            });
            console.log(`final:`);
            console.log(topics);
        });
            topicUrls.forEach(function (topicUrl) {
                surperagent(topicUrl)
                    .end(function (err,res) {
                        console.log(`fetch ${topicUrl} successful`);
                        ep.emit('topic_html',[topicUrl,res.text]);
                    });

        });
    });