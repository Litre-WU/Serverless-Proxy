const http = require('http');
const urlLib = require('url');

http.createServer((req, res) => {
    let obj = urlLib.parse(req.url, true);
    let url = obj.pathname;
    let params = obj.query;
    console.log(url, params);
    res.write('success');
    res.end();
}).listen(8080);