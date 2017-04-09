
After you managed to save the token.

## Check the routes with curl

1, The home route dooesn't require a token
```
curl -v http://localhost:3000/
```

## Secure route requires a token
Try to access the /secure route without providing a token

```
curl -v http://localhost:3000/secure
```

```
{"statusCode":401,"error":"Unauthorized","message":"Missing authentication"}
```
