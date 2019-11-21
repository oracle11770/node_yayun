var express = require('express');
var router = express.Router();
var indexObj = require('../models/index')

router.get("", async function (req, res) {
    await res.render('index.ejs',{
    });
});
router.get("/query", async function (req, res) {
    // console.log('req.body',req.params, req.body, req.query)
    // req.query.word = urlencode(req.query.word)
    const isRender = req.query.isRender === 'false' ? true : false
    delete req.query.isRender
    let resultData = {}
    if(req.query.source && 
        (req.query.source === 'tang' || req.query.source === "song" || req.query.source === "yuan")){
        resultData = await indexObj.getQueryVerse(req.query)
    }else{
        resultData = await indexObj.getQueryResult(req.query)
    }
    console.log(resultData,'==========',req.query); 
    let curi = 0
    let total = resultData.data.total
    let fromi = req.query.fromi
    if (fromi < total) {
        curi = fromi > 6 ? (fromi - 6) : curi
    } else {
        curi = total - total % 10
    }
    var html = []
    resultData.data.body.forEach(function (item) {
        var body = item.body.split('。').join('。<br/>')
        html.push(`<div class='verDiv'>
                <p>${item.title}</p>
                <p>作者：&nbsp;${item.author}</p>
                <p>${body}</p>
        </div>`)
    });
    if(isRender){
        // console.log(99999999999,resultData)
        console.log('=======99999999999', isRender, JSON.stringify(resultData))
        await res.send({
            queryName: req.query.word,
            data: html,
            source: req.query.source,
            total,
            curi
        })
    }else{
        console.log('=======', isRender, JSON.stringify(resultData))
        await res.render('response.ejs',{
            data: html,
            source: req.query.source,
            total,
            curi,
            queryName: req.query.word,
            body: req.query.word
        });
    }
});
module.exports = router