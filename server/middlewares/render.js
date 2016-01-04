'use strict';

const renderers = require('./renderers');

module.exports = (settings) => function *(next) {
  this.render = (name, options) =>
    renderers.react(settings.layout, settings.views, name, options);
  yield next;
};
