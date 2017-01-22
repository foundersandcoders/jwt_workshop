## Create a JSON web token in three steps

1. Create header (algorithm and token type) using encoding

2. Create payload (bulk of information) using encoding
3.  Create signature using encryption and encoding

```
let options = {
        'expiresIn': Date.now() + 24 * 60 * 60 * 1000,
        'subject': 'github-data'
      }
```

```
let payload = {
    'user': {
        'username': body.login,
        'img_url': body.avatar_url,
        'user_id': body.id
      },
    'accessToken': token.access_token
  };
```
```
jwt.sign(payload,secret,options,callback);
```
