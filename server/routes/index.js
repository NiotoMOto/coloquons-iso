'use strict';

const koa = require('koa');
const route = require('koa-route');

const main = koa();

main.use(route.get('/', function *() {
  console.log('req', this.req.user);
  this.body = yield this.render('Home', {
    props: {
      cheers: 'Coloquons',
      user: this.req.user,
    },
    title: 'home'
  });
}));

main.use(route.get('/user', function *() {
  this.body = yield this.render('User', {
    props: {
      cheers: 'Coloquons',
      user: this.req.user,
    },
    title: 'user'
  });
}));



module.exports = main;
