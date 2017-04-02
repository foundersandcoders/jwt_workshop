## Create a JSON web token in three steps

1. Create header (algorithm and token type) using encoding

```
let options = {
        'expiresIn': Date.now() + 24 * 60 * 60 * 1000,
        'subject': 'github-data'
      }
```

2. Create payload (bulk of information) using encoding

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
3.  Create signature using encryption and encoding

```
jwt.sign(payload,secret,options,callback);
```

4. 5. register the authentication strategy

```
server.auth.strategy('jwt', 'jwt',
  { key: process.env.SECRET,
    validateFunc: validate,
    verifyOptions: { algorithms: [ 'HS256' ] }
  });
```

5. verify your json

```
function(token, request,callback){
  console.log('Calling the validate function');
  console.log(token.id);
  //here the token is decoded!!!!!!!
  if (!people[token.id]) {
     return callback(null, false);
   }
   else {
     return callback(null, true);
   }
};
```
