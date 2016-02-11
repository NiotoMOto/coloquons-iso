import * as React from 'react';
import {AutoComplete, ListItem} from 'material-ui';

const { Component } = React;

interface IStates {
  dataSource: Array<any>;
}

export default class SelectUser extends Component<void, IStates> {
  state = {
    dataSource: ['Antoine', 'Sébastien']
  }

  constructor(props){
    super(props);
  }

  render(): JSX.Element {
    return (
      <AutoComplete autoComplete="off" dataSource={this.state.dataSource}>
      </AutoComplete>
    );
  }
}
