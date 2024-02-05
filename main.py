from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib import request, parse


def fetch(**kwargs):
    res = "err".encode()
    try:
        url = kwargs.get("url", "")
        if not url: return None
        data = parse.urlencode(eval(kwargs["data"])).encode() if kwargs.get("data") else None
        req = request.Request(method=kwargs.get("method", "GET"), url=url, data=data,
                              headers=eval(kwargs["headers"]) if kwargs.get("headers") else None)
        res = request.urlopen(req).read()
    except Exception as e:
        print(f'\033[93m{e}')
    return res


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # print(f'\033[92m{self.path}')
        res = "Hello World".encode()
        if self.path[1:6] == "proxy":
            parsed_url = parse.urlparse(self.path)
            params = parse.parse_qs(parsed_url.query)
            kwargs = {
                "method": "".join(params.get("method", ["GET"])),
                "url": "".join(params.get("url", "")),
                "params": "".join(params.get("params", {})),
                "data": "".join(params.get("data", {})),
                "headers": "".join(params.get("headers", "")),
            }
            print(f'\033[94m{kwargs}')
            res = fetch(**kwargs)
        self.send_response(200)
        self.end_headers()
        self.wfile.write(res)


if __name__ == '__main__':
    server = HTTPServer(('', 80), Handler)
    host, port = server.socket.getsockname()
    print(f'\033[92mServing HTTP on (http://{host}:{port})')
    server.serve_forever()
