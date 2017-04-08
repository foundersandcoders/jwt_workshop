const env = require('env2')('./config.env');
const Request = require('request');
const querystring = require('querystring');
const jwt = require('jsonwebtoken');

const welcomeHandler = (req,rep) => {
  //console.log(req.url.query.code)
  const body = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code: req.url.query.code,
  }
  Request.post({url:'https://github.com/login/oauth/access_token', form: body},(err,res,body) => {
    if (err) throw err;

    let token = querystring.parse(body);
    let  url = `https://api.github.com/user`;
    let  header = {
                'User-Agent': 'oauth_github_jwt',
                Authorization: `token ${token.access_token}`
              };
  //  rep(token); // end of Monday's workshop here
    Request.get({url:url, headers:header}, function (error, response, body) {
      //  console.log(JSON.parse(body));
      // rep(body);
      const secret = process.env.SECRET;
     body =JSON.parse(body);
      let payload = {
        'user': {
          'username': body.login,
          'img_url': body.avatar_url,
          'user_id': 1//body.id
        },
        'accessToken': token.access_token
      };
    //  console.log('payload',payload);
      let options = {
        'expiresIn': Date.now() + 24 * 60 * 60 * 1000,
        'subject': 'github-data'
      }
    //  console.log(payload,secret,options);
       jwt.sign(payload,secret,options, (err,token) => {
      //  console.log(token);
      //  console.log('decoded token',jwt.verify(token, process.env.SECRET));
      rep
        .redirect('/secure') //make a new route for the redirect, config it with an authentication strategy
        .state('token', token,
          {
          path: '/',
          isHttpOnly: false,
          isSecure: process.env.NODE_ENV === 'PRODUCTION' });
    });
  });
});
};

const welcome = {
  method: 'GET',
  path: '/welcome',
  handler: welcomeHandler,
};

module.exports = welcome;
