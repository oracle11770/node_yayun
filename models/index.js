var axios = require('axios')
var api = 'http://api.51rhyme.com'
module.exports = {
    getQueryResult: async (params) => {
        let data = ''
        console.log('********************',params)
        await axios.get(api+'/index/api/yayun',{params}).then((res) => {
            // console.log('res.status',res.status, typeof res.status)
            if (res.status === 200) {
                data = res.data
            }
        }).catch((err) => {
            console.log('getQueryResult字----------------',err)
            data = '服务响应超时，请稍后重试。'
        })

        return data
    },
    getQueryWords: async (params) => {
        let data = ''
        console.log('********************',params)
        await axios.get(api+'/index/api/yayunc',{params}).then((res) => {
            if (res.status === 200) {
                data = res.data
            }
        }).catch((err) => {
            console.log('getQueryWords 词组----------------',err)
            data = '服务响应超时，请稍后重试。'
        })
        return data
    },
    getQueryVerse: async (params) => {
        let data = ''
        params.size = 10;
        if(Number(params.curi)){
            params.from = params.curi
        }
        console.log('============---------',params)
        await axios.get(api+'/index/api/body',{params}).then((res) => {
            // console.log('res.status',res.status, typeof res.status)
            if (res.status === 200) {
                data = res.data
            }
        }).catch((err) => {
            console.log('getQueryVerse诗词----------------',err)
            data = '服务响应超时，请稍后重试2。'
        })

        return data
    },
}