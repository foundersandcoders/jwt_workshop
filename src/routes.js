const home = require('./routes/home.route');
const staticFiles = require('./routes/static.route');
const login = require('./routes/login.route.js');
const welcome = require('./routes/welcome.route.js');
const secure = require('./routes/secure.route.js');

module.exports = [
  home,
  staticFiles,
  login,
  welcome,
  secure
];
