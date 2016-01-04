'use strict';

import 'whatwg-fetch';

import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

import containers from './containers';
import { base64ToJSON } from './services/util';

injectTapEventPlugin();

const data = document.getElementById('data');
const { id, props = {} } = base64ToJSON((data as HTMLScriptElement).text);

ReactDom.render(
  React.createElement(containers[id], props),
  document.getElementById('root')
);
