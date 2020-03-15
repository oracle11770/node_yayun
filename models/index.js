var axios = require('axios')
var api = 'http://api.51rhyme.com'
module.exports = {
    // 获取词
    getQueryResult: async (params) => {
        let data = ''
        console.log('********************',params)
        await axios.get(api+'/index/api/yayun',{params}).then((res) => {
            // console.log('res.status',res.status, typeof res.status)
            console.log('getQueryResult', res.data)
            if (res.status === 200) {
                data = res.data
            }
        }).catch((err) => {
            console.log('getQueryResult字----------------',err)
            data = '服务响应超时，请稍后重试。'
        })

        return data
    },
    // 获取歌词api
    getQuerySong: async (params) => {
        let data = ''
        params.size = 10;
        if(Number(params.curi)){
            params.from = params.curi
        }
        console.log('============---------',params)
        await axios.get(api+'/index/api/song',{params}).then((res) => {
            // console.log('res.status',res.status, typeof res.status)
            console.log('getQuerySong', res.data)
            if (res.status === 200) {
                data = res.data
            }
        }).catch((err) => {
            console.log('getQuerySong----------------',err)
            data = '服务响应超时，请稍后重试2。'
        })

        return data
    },
    // 获取词组
    getQueryWords: async (params) => {
        let data = ''
        console.log('********************',params)
        await axios.get(api+'/index/api/yayunc',{params}).then((res) => {
            console.log('getQueryWords', res.data)
            if (res.status === 200) {
                data = res.data
            }
        }).catch((err) => {
            console.log('getQueryWords 词组----------------',err)
            data = '服务响应超时，请稍后重试。'
        })
        return data
    },
    // 获取诗词词组
    getQueryVerse: async (params) => {
        let data = ''
        params.size = 10;
        if(Number(params.curi)){
            params.from = params.curi
        }
        console.log('============---------',params)
        await axios.get(api+'/index/api/body',{params}).then((res) => {
            // console.log('res.status',res.status, typeof res.status)
            console.log('getQueryVerse', res.data)
            if (res.status === 200) {
                data = res.data
            }
        }).catch((err) => {
            console.log('getQueryVerse诗词----------------',err)
            data = '服务响应超时，请稍后重试2。'
        })

        return data
    },
    // 获取字的注释
    getWordsNote: async (params) => {
        let data = ''
        console.log('********************',params)
        await axios.get(api+'/index/api/yayund',{params}).then((res) => {
            console.log('getWordsNote', res.data)
            if (res.status === 200) {
                data = res.data
            }
        }).catch((err) => {
            console.log('getWordsNote 词组----------------',err)
            data = '服务响应超时，请稍后重试。'
        })
        return data
    },
}