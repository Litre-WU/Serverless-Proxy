const http = require('http');
const urlLib = require('url');

http.createServer((req, res) => {
    let obj = urlLib.parse(req.url, true);
    let path = obj.pathname;
    let query = obj.query;

    console.log(path, query);

    if (path === '/') {
        res.write('Hello World');
        res.end();
        return;
    }


    const params = typeof query.params === 'string' ? new URLSearchParams(JSON.parse(query.params)) : query.params;
    const url = params ? `${query.url}?${params}` : query.url;
    const body = typeof query.body === 'string' ? JSON.parse(query.body) : query.body;
    const headers = typeof query.headers === 'string' ? JSON.parse(query.headers) : query.headers;

    if (query.method === 'GET') {
        fetch(url, {
            method: query.method,
            headers: headers,
        }).then((response) => response.text()).then((text) => {
            // console.log(text);
            res.write(text);
            res.end();
        }).catch(err => {
            console.log(err);
            res.write(text);
            res.end();
        });
    }
    if (query.method === 'POST') {
        fetch(url, {
            method: query.method,
            headers: headers,
            body: body
        }).then((response) => response.text()).then((text) => {
            // console.log(text);
            res.write(text);
            res.end();
        }).catch(err => {
            console.log(err);
            res.write(text);
            res.end();
        });
    }
}).listen(8080);
