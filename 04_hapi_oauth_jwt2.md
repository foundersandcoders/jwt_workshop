## Create a JSON web token in


The hands o part of this workshop builds on the [oAuth workshop](https://foundersandcoders.gitbooks.io/fac9/content/week8/workshop.html) on Monday.  


1. In Step 4 (Monday's) workshop we send a POST request to the github API, and the response's body
contains the access token. This is the starting point of this workshop.

If we want to authenticate or user with github, get their details (e.g.: name, avatar, user id).
In a real life scenario, we might want to save their details to a database (it is not part of this workshop).

The next step is that we send a GET request to the github API, in order to get these details (that we later want to save in a JSON Web Token).

Hints:
- use the request npm module
- request url: `https://api.github.com/user`;
- ```
  let header = {
            'User-Agent': 'oauth_github_jwt',
            Authorization: `token ${token.access_token}`
          };
```

2.  Build the JSON Web Token!

- secret: it can be  whater you want, save it in config.env.
- options object: I would suggest to set an expiresIn and a subject property
- payload, user , accesToken


Parse the response, and save the username, user id and avatar url
Install the npm packages we use.

```
npm install --save jsonwebtoken
```

```
npm install --save hapi-auth-jwt2
```





------------------------------------------------------
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
3.  Create signature

```
jwt.sign(payload,secret,options,callback);
```

4. 5. register the authentication strategy in server.js

```
server.auth.strategy('jwt', 'jwt',
  { key: process.env.SECRET,
    validateFunc: validate,
    verifyOptions: { algorithms: [ 'HS256' ] }
  });
```

5. Validate function
Note: the token is automatically decoded!!

```
function(token, request,callback){
  console.log(token.id); //deccoded token, it automaitcally decodes it
  if (!people[token.id]) {
     return callback(null, false);
   }
   else {
     return callback(null, true);
   }
};
```
