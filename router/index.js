var express = require('express');
var router = express.Router();
var indexObj = require('../models/index')
var {wordData, wordsData, poemData, wordNote,songData,cyData} = require('./data')

router.get("", async function (req, res) {
    await res.render('index.ejs',{
    });
});

router.get("/cyjl", async function(req, res){
    console.log('req.body++++', req.query)
    const resultData = await indexObj.getCyjl(req.query)
    // const resultData = cyData;
    // console.log(resultData)
    await res.send({
        data: resultData
    })
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
        // resultData = wordsData
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
                total = Number(resData.total)
                curi = Number(req.query.curi)
                if (curi < total) {
                    fromi = curi > 6 ? (curi - 6) : fromi
                } else {
                    fromi = total - total % 10
                }
                resData.body.forEach(function (item) {
                   item.ci = item.ci.replace(item.lastword, '<span>'+item.lastword+'</span>')
                });
                html = resData.body
            }
        }
    }else if(source === 'lyrics'){
        // 歌词
        resType = 'lyrics'
        resultData = await indexObj.getQuerySong(req.query)
        // resultData = songData
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
                    let lastwds = item.lastword.replace(new RegExp(",", "g"),'').split('')
                    for(let i=0,len=lastwds.length;i<len;i++){
                        const tempstr = lastwds[i]
                        item.body = item.body.replace(new RegExp(""+tempstr+"\n","g"),"<span>"+lastwds[i]+"</span>。")
                        item.body = item.body.replace(new RegExp(""+tempstr+" ","g"),"<span>"+lastwds[i]+"</span>。")
                    }
                    item.body = item.body.split('。')
                    item.body.splice(item.body.length-1, 1)
                });
                html = resData.body
            }
        }

    }else if(source === 'comment'){
        resultData = await indexObj.getWordsNote(req.query)
        // resultData = wordNote

        let resData = []
        if(typeof resultData == 'string'){
            html = resultData
        }else{
            if(resultData){
                resData = Object.assign({},resultData)
                global.resOldData =  resultData
            }else{
                resData = global.resOldData
            }
            let obj = resData.body[0]
            html = `<div class="note-row">
                <div class="row-part">
                    <div class="note-label">字</div>
                    <div class="note-val">${obj.word}</div>
                </div>
                <div class="row-part">
                    <div class="note-label">拼音</div>
                    <div class="note-val">${obj.pinyin}</div>
                </div>
            </div>
            <div class="note-row">
                <div class="row-part">
                    <div class="note-label">繁体</div>
                    <div class="note-val">${obj.oldword}</div>
                </div>
                <div class="row-part">
                    <div class="note-label">笔画</div>
                    <div class="note-val">${obj.strokes}</div>
                </div>
            </div>
            <div class="note-row">
                <div  class="row-part">
                    <div class="note-label">部首</div>
                    <div class="note-val">${obj.radicals}</div>
                </div>
            </div>
            <div class="note-cnt">${obj.explanation}
            </div>`
        }
    } else {
        // 词
        delete req.query.source
        // resultData = await indexObj.getQueryResult(req.query)
        resultData = wordData;
        let resData = []
        if(typeof resultData == 'string'){
            html = resultData
        }else{
            if(resultData ){
                resData = Object.assign({},resultData)
                global.resOldData =  resultData
            }else{
                resData = global.resOldData
            }
            for(let key in resData){
                html.push('<span>'+resData[key]+'</span>')
            }
        }
    }
    console.log('+_++++++++++++++++++',req.query,resType); 
   
    if(isRender){
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