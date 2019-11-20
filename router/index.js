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
    if(isRender){
        // console.log(99999999999,resultData)
        await res.send({
            queryName: req.query.word,
            data: resultData,
        })
    }else{
        await res.render('response.ejs',{
            data: resultData,
            total: resultData.length,
            queryName: req.query.word,
            body: req.query.word
        });
    }
});
module.exports = router