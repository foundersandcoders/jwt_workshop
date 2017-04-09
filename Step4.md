## JWT workshop


The hands on part of this workshop builds on the [oAuth workshop](https://github.com/foundersandcoders/oauth) on Monday.  


The workshop uses the ```hapi-auth-jwt2``` and the ```jsonwebtoken``` npm packages. These packages handle many things under the hood. E.g.: Encoding and signing the different parts of the json web token is hidden form our eyes.

### Step 1

 In Step 4 (Monday's) workshop we send a POST request to the github API, and the response's body
contains the access token. This is the starting point of this workshop.

If we want to authenticate or user with github, get their details (e.g.: name, avatar, user id).
In a real life scenario, we might want to save their details to a database (it is not part of this workshop).

The next step is that we send a GET request to the github API, in order to get these details (that we later want to save in a JSON Web Token).

Hints:
- use the request npm module
- request url: `https://api.github.com/user`;
- header:  
 ```
  let header = {
            'User-Agent': 'oauth_github_jwt',
            Authorization: `token ${token.access_token}`
          };
```
- get request:  
```
  Request.get({url:url, headers:header}, function (error, response, body) {...}
  ```
### Step 2  Build the JSON Web Token!

Install the npm packages we use.

```
npm install --save jsonwebtoken
```

- secret: used for signing the token, it can be  whater you want, save it as an environment variable.
- options object: include the expiration data and the subject.
```
let options = {
        'expiresIn': Date.now() + 24 * 60 * 60 * 1000,
        'subject': 'github-data'
      }
```
- Create payload
It should contain the user details (from the get request to the github API) and the access token.

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

  -  Create signature

General:
```
jwt.sign(payload,secret,options,callback);
```

This function build the JSON web token. Please bear in mind that JWTs don't encrypt. They are encoded and signed. If the aim is not to expose the token to the user, a JWT in itself won't protect it.

- the simplest approach is to set the JST in a cookie, it is an acceptable approach, in this way the client won1t be able to read it. (This is what we do in this workshop.)
- store the cookie on the server
- encrypt the cookie.

For us now:
```
jwt.sign(payload,secret,options, (err,token) => {
//  console.log(token);
//  console.log('decoded token',jwt.verify(token, process.env.SECRET)); // check that you can decode it
reply
 .redirect('/secure') //make a new route for the redirect, config it with an authentication strategy
 .state('token', token,
   {
   path: '/',  // the token is valid for every path starting with /
   isHttpOnly: false,
   isSecure: process.env.NODE_ENV === 'PRODUCTION' });
});
```

Configure the auth strategy for the new route:
```
const secure={
  method: 'GET',
  path: '/secure',
  config: {auth: 'jwt'},
  handler: secureHandler,
}
```

## Step 3 register the authentication strategy in server.js


```
npm install --save hapi-auth-jwt2
```

```
server.auth.strategy('jwt', 'jwt',
  { key: process.env.SECRET,
    validateFunc: validate,
    verifyOptions: { algorithms: [ 'HS256' ] }
  });
```

## STEP 4  Validate function
Note: the token is automatically decoded!!

- build a dummy users object,(normally you would have a users database, and you would query the database)

```
var people = { // our "users database", use your github details here
    1: {
      id: 1,
      name: 'Jen Jones'
    }
};
```

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

Resources:
- [hapi-auth-jwt2](https://github.com/dwyl/hapi-auth-jwt2)
- [hapi-auth-jwt2](https://www.npmjs.com/package/hapi-auth-jwt2)


[Step 5 - Checking the authentication of routes](./Step5.md)
