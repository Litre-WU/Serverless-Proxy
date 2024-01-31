# Serverless-Proxy 使用Serverless代理IP


# 食用方法

```bash
pip install httpx
```

# GET请求

```python
import httpx
import json

kwargs = {
      "method": "GET",
      "url": "http://127.0.0.1:8080/proxy",
      "params": {
            "method": "GET",
            "url": "https://myip.ipip.net",
            "headers": json.dumps({"Content-Type": "application/json"})
        }
    }
res = httpx.request(**kwargs)
if res.status_code == 200:
    print(res.text)
```

# POST请求

```python
import httpx
import json

kwargs = {
      "method": "GET",
      "url": "http://127.0.0.1:8080/proxy",
      "params": {
            "method": "POST",
            "url": "https://127.0.0.1:8000",
            "data": json.dumps({"test":1}),
            "headers": json.dumps({"Content-Type": "application/json"})
        }
    }
res = httpx.request(**kwargs)
if res.status_code == 200:
    print(res.text)
```
