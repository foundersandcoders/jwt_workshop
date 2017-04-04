const homeHandler = (req, rep) => {
  rep.file('./public/index.html');
}

const home={
  method: 'GET',
  path: '/',
  handler: homeHandler,
}

module.exports = home;
