'use strict';

const path = require('path');

const ReactDOMServer = require('react-dom/server');
const React = require('react');
const ejs = require('ejs');

const util = require('../../services/util');

module.exports = (layout, views, name, options) => new Promise((resolve, reject) => {
  try {
    const component = require(path.resolve(views, name))[options.key || 'default'];
    const data = {
      id: options.id || util.common.dashify(name),
      props: options.props,
    };

    ejs.renderFile(layout, {
      data: util.objectToBase64(data),
      content: ReactDOMServer.renderToString(
        React.createElement(component, data.props)
      ),
    }, (err, html) => {
      if (err) {
        reject(err);
      } else {
        resolve(html);
      }
    });
  } catch(e) {
    reject(e);
  }
});
