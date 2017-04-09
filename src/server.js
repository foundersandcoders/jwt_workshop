const Hapi = require('hapi');
const Inert = require('inert');
const HapiAuthJWT2 = require('hapi-auth-jwt2');
const options = {
    connections: {
        state: {
            isSameSite: 'Lax'
        }
    }
};
const server = new Hapi.Server(options);
const Routes = require('./routes.js');
const validate = require('./validate.js');

server.connection({
  port: 3000,
  host: 'localhost',
});


server.register([Inert,HapiAuthJWT2], (err) => {
  if (err) throw err;
  server.auth.strategy('jwt', 'jwt',
   { key: process.env.SECRET,
     validateFunc: validate,
     verifyOptions: { algorithms: [ 'HS256' ] }
   });
  server.route(Routes);
});

module.exports = server;
