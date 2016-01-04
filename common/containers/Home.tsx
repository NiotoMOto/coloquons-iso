'use strict';

import * as React from 'react';

const { Component } = React;

interface IProps {
  cheers: string;
}

export default class Home extends Component<IProps, void> {
  render(): JSX.Element {
    return (
      <h1>{this.props.cheers}</h1>
    );
  }
}
