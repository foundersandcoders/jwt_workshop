
After you managed to save the token.

## Check the routes with curl

The home route doesn't require a token
```shell
curl -v http://localhost:3000/
```

## Secure route requires a token
Try to access the /secure route without providing a token

```shell
curl -v http://localhost:3000/secure
```

```shell
{"statusCode":401,"error":"Unauthorized","message":"Missing authentication"}
```
