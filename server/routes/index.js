'use strict';

const koa = require('koa');
const route = require('koa-route');
const rp = require('request-promise');

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
  const deputes = yield rp('http://localhost:4001/api/v1/deputes').then(json => {
    return JSON.parse(json);
  });
  this.body = yield this.render('User', {
    props: {
      cheers: 'Coloquons',
      user: this.req.user ||  {username: 'foo bar'},
      deputes,
    },
    title: 'user'
  });
}));



module.exports = main;
