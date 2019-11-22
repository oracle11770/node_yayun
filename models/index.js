var axios = require('axios')
var api = 'http://api.51rhyme.com'
module.exports = {
    getQueryResult: async (params) => {
        let data = ''
        await axios.get(api+'/index/api/yayun',{params}).then((res) => {
            // console.log('res.status',res.status, typeof res.status)
            if (res.status === 200) {
                data = res.data
            }
        }).catch((err) => {
            console.log('----------------',err)
            data = '服务响应超时，请稍后重试。'
        })

        return data
    },
    getQueryVerse: async (params) => {
        let data = ''
        await axios.get(api+'/index/api/body',{params}).then((res) => {
            // console.log('res.status',res.status, typeof res.status)
            if (res.status === 200) {
                data = res.data
                console.log('服务器响应的值====',res)
            }
        }).catch((err) => {
            console.log('----------------',err)
            data = '服务响应超时，请稍后重试2。'
        })

        return data
    },
}