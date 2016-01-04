'use strict';

const koa = require('koa');
const route = require('koa-route');

const main = koa();

main.use(route.get('/', function *() {
  this.body = yield this.render('Home', {
    props: {
      cheers: 'Tests',
    },
  });
}));

module.exports = main;
