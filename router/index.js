var express = require('express');
var router = express.Router();
var indexObj = require('../models/index')

router.get("", async function (req, res) {
    await res.render('index.ejs',{
    });
});

router.get("/queryNote", async function(req, res){
    
})

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
    let resType = 'word'
    var html = []

    if (source && 
        (source === 'tang' || source === "song" || source === "yuan")){
        resType = 'poem';
        resultData = await indexObj.getQueryVerse(req.query)
        console.log('**************', resultData)
        let resData = {
            body: []
        }
        if(typeof resultData === 'string'){
            html = [resultData]
        }else{
            if(resultData && resultData.body && resultData.body.length > 0){
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
                    let lastwds = item.lastword.split('')
                    for(let i=0,len=lastwds.length;i<len;i++){
                        const tempstr = lastwds[i]
                        item.body = item.body.replace(new RegExp(""+tempstr+",","g"),"<span>"+lastwds[i]+"</span>,")
                        item.body = item.body.replace(new RegExp(""+tempstr+"。","g"),"<span>"+lastwds[i]+"</span>。")
                    }
                    item.body = item.body.split('。')
                    item.body.splice(item.body.length-1, 1)
                });
                html = resData.body
            }
        }
    }else if(source === 'words'){
        resType = 'words';
        // 词组
        resultData = await indexObj.getQueryWords(req.query)
        if(typeof resultData === 'string'){
            html = [resultData]
        }else{
            if(resultData && resultData.body && resultData.body.length > 0){
                resData = Object.assign({},resultData)
                global.resOldData = resultData
            }else{
                resData = global.resOldData
            }
            if(JSON.stringify(resData) != "{}" && resData.body){
                resData.body.forEach(function (item) {
                   item.ci = item.ci.replace(item.lastword, '<span>'+item.lastword+'</span>')
                });
                html = resData.body
            }
        }
    }else if(source === 'lyrics'){
        resType = 'lyrics'
        resultData = await indexObj.getQuerySong(req.query)
        if(typeof resultData === 'string'){
            html = [resultData]
        }else{
            if(resultData && resultData.body && resultData.body.length > 0){
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
                    let lastwds = item.lastword.split(',')
                    for(let i=0,len=lastwds.length;i<len;i++){
                        const tempstr = lastwds[i]
                        item.body = item.body.replace(new RegExp(""+tempstr+"\n","g"),"<span>"+lastwds[i]+"</span>。")
                    }
                    item.body = item.body.split('。')
                    item.body.splice(item.body.length-1, 1)
                });
                html = resData.body
            }
        }

    } else {
        delete req.query.source
        resultData = await indexObj.getQueryResult(req.query)
        
        let resData = []
        if(typeof resultData == 'string'){
            html = resultData
        }else{
            if(resultData && resultData.length > 0){
                resData = Object.assign({},resultData)
                global.resOldData =  resultData
            }else{
                resData = global.resOldData
            }
            for(let key in resData){
                html.push(`<span>${resData[key]}</span>`)
            }
            // for(let i=0;i<resDa.length;i++){
            //     html.push(`<span>${resDa[i]}</span>`)
            // }
        }
    }
    console.log(html,'+_++++++++++++++++++',req.query,resType); 
   
    if(isRender){
        // console.log(99999999999,resultData)
        await res.send({
            queryName: req.query.word,
            resultData: resultData,
            data: html,
            source: source,
            resType: resType,
            fromi,
            total,
            curi
        })
    }else{
        await res.render('response.ejs',{
            data: html,
            resType: resType,
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