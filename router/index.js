var express = require('express');
var router = express.Router();
var indexObj = require('../models/index')

router.get("", async function (req, res) {
    await res.render('index.ejs',{
    });
});
router.get("/query", async function (req, res) {
    console.log('req.body',req.params, req.body, req.query)
    // req.query.word = urlencode(req.query.word)
    const isRender = req.query.isRender === 'false' ? true : false
    const source = req.query.source
    delete req.query.isRender
    let resultData = {}
    let curi = 1
    let total = 0
    var html = []

    if (source && 
        (source === 'tang' || source === "song" || source === "yuan")){
        resultData = await indexObj.getQueryVerse(req.query)
        console.log('**************', resultData)
        let resData = Object.assign({}, resultData)
        if(JSON.stringify(resData) != "{}"){
            total = resData.total
            let fromi = req.query.fromi
            if (fromi < total) {
                curi = fromi > 6 ? (fromi - 6) : curi
            } else {
                curi = total - total % 10
            }
            resData.body.forEach(function (item) {
                item.body = item.body.split('。')
                item.body.splice(item.body.length-1, 1)
            });
            html = resData.body
        }
    }else{
        delete req.query.source
        resultData = await indexObj.getQueryResult(req.query)
        html = resultData;
    }
    console.log(html,'+_++++++++++++++++++',req.query); 
  
    
   
    if(isRender){
        // console.log(99999999999,resultData)
        await res.send({
            queryName: req.query.word,
            resultData: resultData,
            data: html,
            source: 'source' ,
            total,
            curi
        })
    }else{
        await res.render('response.ejs',{
            data: html,
            source: source || "",
            total,
            curi,
            queryName: req.query.word,
            body: req.query.word
        });
    }
});
module.exports = router