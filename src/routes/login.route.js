const querystring = require('querystring');
const env = require('env2')('./config.env');

const loginHandler = (req, rep) => {
  const query = {
    client_id: process.env.CLIENT_ID,
    redirect_uri:  process.env.BASE_URL+'/welcome',
    scope: 'user public_repo'
  }
  rep.redirect(`https://github.com/login/oauth/authorize?${querystring.stringify(query)}`)
}

const login = {
  method: 'GET',
  path: '/login',
  handler: loginHandler,
};

module.exports = login;
