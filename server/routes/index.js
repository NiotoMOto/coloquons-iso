'use strict';

const koa = require('koa');
const route = require('koa-route');

const main = koa();

main.use(route.get('/', function *() {
  this.body = yield this.render('Home', {
    props: {
      cheers: 'Coloquons',
    },
    title: 'home'
  });
}));

main.use(route.get('/user', function *() {
  this.body = yield this.render('User', {
    props: {
      cheers: 'Coloquons',
    },
    title: 'user'
  });
}));



module.exports = main;
