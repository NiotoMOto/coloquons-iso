import * as React from 'react';
import {AutoComplete, ListItem} from 'material-ui';
import {Model} from '../services/Model';

const { Component } = React;

interface IStates {
  dataSource: Array<any>;
}

export default class SelectUser extends Component<void, IStates> {
  state = {
    dataSource: []
  }

  constructor(props){
    super(props);
    this.fetchUsers = this.fetchUsers.bind(this);
  }

  fetchUsers() {
    new Model('User').getAll().then( users => {
      console.log(users);
      this.setState({
        dataSource: users
      })
    });
  }

  filterUser(searchText, key) {
    console.log('===> ',searchText, key);
  }

  render(): JSX.Element {
    return (
      <AutoComplete onUpdateInput={this.fetchUsers} autoComplete="off" hintText="user" filter={this.filterUser} dataSource={this.state.dataSource}>
      </AutoComplete>
    );
  }
}
