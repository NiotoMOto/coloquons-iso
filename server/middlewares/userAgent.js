'use strict';

module.exports = settings => function *(next) {
  this.navigator = global.navigator = {
    userAgent: this.headers['user-agent'],
  };
  yield next;
};
