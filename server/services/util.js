'use strict';

const objectToBase64 = obj =>
  new Buffer(JSON.stringify(obj), 'utf-8').toString('base64');

module.exports = {
  objectToBase64,
  common: require('../common/services/util'),
};
