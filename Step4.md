## JWT workshop


The hands on part of this workshop builds on the [OAuth workshop](https://github.com/foundersandcoders/oauth-workshop) from yesterday.  


The workshop uses the ```hapi-auth-jwt2``` and the ```jsonwebtoken``` npm packages. These packages handle many things under the hood. E.g. Encoding and signing the different parts of the JSON Web Token is hidden form us.

### Step 1 - Query the github API

In [Step 5](https://github.com/foundersandcoders/oauth-workshop/blob/master/step5.md) of Day 1's OAuth workshop, we sent a POST request to the github API, and the body of the response contained the access token. This is the starting point of this workshop.

If we want to authenticate our user with github, we need to get their details (e.g. name, avatar, user id).  
In a real life scenario, we might want to save their details to a database (it is not part of this workshop).

The next step is that we send a GET request to the github API, in order to get these details (that we later want to save in a JSON Web Token).

Hints:
- use the request npm module
- request url: `https://api.github.com/user`;
- header:  
```javascript
const headers = {
  'User-Agent': 'oauth_github_jwt',
  Authorization: `token ${body.access_token}`
};
```
- get request:  
```javascript
Request.get({url:url, headers:headers}, function (error, response, body) {...})
```
### Step 2 - Build the JSON Web Token!

Install the npm packages we use.

```shell
npm install --save jsonwebtoken
```

- secret: used for signing the token, it can be  whater you want, save it as an environment variable.
- options object: include the expiration date and the subject.

```javascript
let options = {
  'expiresIn': Date.now() + 24 * 60 * 60 * 1000,
  'subject': 'github-data'
}
```

- Create payload
It should contain the user details (from the get request to the github API) and the access token.

```javascript
let payload = {
  'user': {
      'username': body.login,
      'img_url': body.avatar_url,
      'user_id': body.id
    },
  'accessToken': token.access_token
};
```

- Create signature

General:
```javascript
jwt.sign(payload,secret,options,callback);
```

This function build the JSON Web Token. Please bare in mind that JWTs are not encrypted. They are encoded and signed. If the aim is not to expose the token to the user, a JWT in itself won't protect it.

- the simplest approach is to set the JWT in a cookie, it is an acceptable approach, in this way the client won't be able to read it. (This is what we do in this workshop.)
- store the cookie on the server
- encrypt the cookie.

For us now:
```javascript
jwt.sign(payload, secret, options, (err, token) => {
  //  console.log(token);
  //  console.log('decoded token',jwt.verify(token, process.env.SECRET)); // check that you can decode it
  let config = {
    path: '/',  // the token is valid for every path starting with /
    isSecure: process.env.NODE_ENV === 'PRODUCTION'
  }

  reply
   .redirect('/secure') //make a new route for the redirect, config it with an authentication strategy
   .state('token', token, config);
});
```

Configure the auth strategy for the new route:
```javascript
const secure = {
  method: 'GET',
  path: '/secure',
  config: {auth: 'jwt'},
  handler: secureHandler,
}
```

### Step 3 - Register the authentication strategy in server.js


```shell
npm install --save hapi-auth-jwt2
```

```javascript
const strategyOptions = {
  key: process.env.SECRET,
  validateFunc: validate,
  verifyOptions: { algorithms: [ 'HS256' ] }
}

server.auth.strategy('jwt', 'jwt', strategyOptions);
```

### Step 4 - Validate function
Note: the token is automatically decoded!!

- build a dummy users object (normally you would have a users database, and you would query the database)

```javascript
const people = { // our "users database", use your github details here
  1: {
    id: 1,
    name: 'Jen Jones'
  }
};
```

```javascript
const validate = (token, request,callback) => {
  console.log(token.id); // decoded token, it automatically decodes it
  if (!people[token.user.user_id]) {
     return callback(null, false);
   }
   return callback(null, true);
};
```
[Step 5 - Checking the authentication of routes](./Step5.md)

Resources:
- [hapi-auth-jwt2](https://github.com/dwyl/hapi-auth-jwt2)
- [hapi-auth-jwt2](https://www.npmjs.com/package/hapi-auth-jwt2)
