var axios = require('axios')
var api = 'http://api.rhyme.com'
module.exports = {
    getQueryResult: async (params) => {
        let data = ''
        await axios.get(api+'/index/api/yayun',{params}).then((res) => {
            console.log('res.status',res.status, typeof res.status)
            if (res.status === 200) {
                data = res.data
            }
        }).catch((err) => {
            console.log('----------------',err)
            data = '服务响应超时，请稍后重试。'
        })

        return data
    }
}