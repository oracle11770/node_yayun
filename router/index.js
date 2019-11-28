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
    let fromi = 1
    let curi = 0
    let total = 0
    var html = []

    if (source && 
        (source === 'tang' || source === "song" || source === "yuan")){
        resultData = await indexObj.getQueryVerse(req.query)
        console.log('**************', resultData)
        let resData = {
            body: []
        }
        if(typeof resultData === 'string'){
            html = [resultData]
        }else{
            if(resultData && resultData.body && resultData.body.length > 1){
                resData = Object.assign({},resultData)
                global.resOldData =  resultData
            }else{
                resData = global.resOldData
            }
            if(JSON.stringify(resData) != "{}" && resData.body){
                total = Number(resData.total)
                curi = Number(req.query.curi)
                if (curi < total) {
                    fromi = curi > 6 ? (curi - 6) : fromi
                } else {
                    fromi = total - total % 10
                }
                resData.body.forEach(function (item) {
                    item.body = item.body.split('。')
                    item.body.splice(item.body.length-1, 1)
                });
                html = resData.body
            }
        }
    }else{
        delete req.query.source
        resultData = await indexObj.getQueryResult(req.query)
        let resData = []
        if(typeof resultData == 'string'){
            html = resultData
        }else{
            if(resultData && resultData.length > 1){
                resData = Object.assign({},resultData)
                global.resOldData =  resultData
            }else{
                resData = global.resOldData
            }
            html = resData;
        }
    }
    console.log(html,'+_++++++++++++++++++',req.query); 
   
    if(isRender){
        // console.log(99999999999,resultData)
        await res.send({
            queryName: req.query.word,
            resultData: resultData,
            data: html,
            source: source,
            fromi,
            total,
            curi
        })
    }else{
        await res.render('response.ejs',{
            data: html,
            source: source,
            fromi,
            total,
            curi,
            queryName: req.query.word,
            body: req.query.word
        });
    }
});
module.exports = router