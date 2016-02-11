'use strict';

const path = require('path');

const koa = require('koa');
const mount = require('koa-mount');
const serve = require('koa-static');

const bodyParser = require('koa-bodyparser');
const convert = require('koa-convert');
const session = require('koa-generic-session');
const passport = require('koa-passport')

const middlewares = require('./middlewares');

const routes = require('./routes');
const publicRoutes = require('./routes/publics')
const app = new koa();

const bunyan = require('bunyan');
const bformat = require('bunyan-format');
const formatOut = bformat({ outputMode: 'short' })
const log = bunyan.createLogger({name: "coloquons-iso", stream: formatOut});

if (process.env.NODE_ENV !== 'production') {
  app.use(require('koa-proxy')({
    host: 'http://localhost:8080',
    match: /^\/public\/js\//,
  }));
}

app.use(bodyParser());

app.use(mount('/vendors', serve(path.resolve(__dirname, '..', 'node_modules'))));

app.use(mount('/public', serve(path.resolve(__dirname, '..', 'public'))));

app.use(middlewares.userAgent());

app.use(middlewares.render({
  layout: path.resolve(__dirname, 'views', 'index.ejs'),
  views: path.resolve(__dirname, 'common', 'containers'),
}));


app.keys = ['some secret hurr'];
app.use(session(app));

app.use(passport.initialize())
app.use(passport.session())
require('./services/auth');

app.use(mount('/', publicRoutes));


//logger
app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  log.info('%s %s - %sms', this.method, this.url, ms);
});
app.on('error', function(err){
  log.error('server error', err);
});

if (process.env.NODE_ENV === 'productionss') {
  app.use(function*(next) {
    if (this.isAuthenticated()) {
      yield next;
    } else {
      this.redirect('/login');
    }
  });
}

app.use(mount('/', routes));

module.exports = app;
