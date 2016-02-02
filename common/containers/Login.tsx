'use strict';

import * as React from 'react';
import {Card, Paper, TextField, Divider, RaisedButton} from 'material-ui';
import { autobind, filters } from '../services/util';
const { Component } = React;
import * as superagent from 'superagent';

interface IProps {
  cheers: string;
}

export default class Login extends Component<IProps, void> {

  refs: {
    [key: string]: TextField
  }

  constructor(props){
    super(props);
    autobind(this, filters.listeners);
  }

  onLogin(){
    superagent.post('login')
    .send({
      username: this.refs['login'].getValue(), password: this.refs['password'].getValue()
    })
    .end((err, res)=>{
      // console.log(res);
    })
  }

  getStyle(){
    return {
      form: {
        width: 348,
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center'
      },
      header: {
        width: 348,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 5,
        textAlign: 'center'
      }
    }
  }

  render(): JSX.Element {
    const styles = this.getStyle();
    return (
      <div className="login">
        <div style={styles.header}>
          <h1>Coloquons</h1>
          <h3>Login</h3>
        </div>
        <Paper style={styles.form}>
          <form action="/login" method="post">
            <TextField
              floatingLabelText="Login"
              type="text"
              ref="login"
              name="username"
            /><br/>
            <TextField
              floatingLabelText="Password"
              type="password"
              ref="password"
              name="password"
            /><br/>
            <div className="buttons-block">
              <RaisedButton type="submit" label="Login" primary={true} />
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}
