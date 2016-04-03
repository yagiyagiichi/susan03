var Curl = require('node-libcurl').Curl

var curl = new Curl()


var url_base = ['http://www.google.com/trends/fetchComponent?']
var url_keywords = {
    key: 'q',
    val: [
        'hoge',
        'piyo',
        'fuga'
    ]
}
var url_cid = {
    key: 'cid',
    val: [
        'TIMESERIES_GRAPH_0'
    ]
}
var url_export = {
    key: 'export',
    val: [
        '3'
    ]
}

var urlGet = function(obj) {
    var str = obj.key
    str += '='
    for (var i = 0; i < obj.val.length; i++) {
        str += obj.val[i] + ','
    }
    str = str.slice(0, -1)
    return str
}

var makeUrl = function() {
    return url_base + urlGet(url_keywords) + '&' + urlGet(url_cid) + '&' + urlGet(url_export);
}

console.log(makeUrl())

var url = makeUrl()
    // 'http://www.google.com/trends/fetchComponent?q=word1,word2,word3,word4,word5&cid=TIMESERIES_GRAPH_0&export=3'

curl.setOpt('URL', url)

curl.on('end', function(statusCode, body, headers) {

    console.info(statusCode)
    console.info('---')
    console.info(body)

    this.close()
})

curl.on('error', curl.close.bind(curl))

curl.perform()
