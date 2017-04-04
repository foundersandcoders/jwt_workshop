const secureHandler = (req, rep) => {
  rep.file('./public/secure.html');
}

const secure={
  method: 'GET',
  path: '/secure',
  config: {auth: 'jwt'},
  handler: secureHandler,
}

module.exports = secure;
