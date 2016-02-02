'use strict';

import * as React from 'react';
import AppBarrMenu from './AppBarMenu';
import MenuLeftNav from './MenuLeftNav';
import {Card, CardHeader, CardMedia, CardTitle, CardText, CardActions, FlatButton, Paper} from 'material-ui';
import {getMuiTheme} from 'material-ui/lib/styles/theme-manager';
import {ThemeDecorator, LightRawTheme} from 'material-ui/lib/styles/';
import { autobind, filters } from '../services/util';
import { StylePropable, StyleResizable} from 'material-ui/lib/mixins/';
const { Component } = React;

interface IProps {
  children?: React.ReactNode;
  title: string;
}

interface IState {
  leftNavOpen?: boolean;
  docked?: boolean;
  muiTheme?: any;
  showMenuIcon?: boolean;
}

export default class Layout extends Component<IProps, IState> {
  state = {
    leftNavOpen: true,
    docked: true,
    muiTheme: getMuiTheme(LightRawTheme),
    showMenuIcon: false
  }

  static mixins: [
    StylePropable,
    StyleResizable
  ]

  constructor(props){
    super(props);
    autobind(this, filters.listeners);
  }

  onLeftIconButtonTouchTap() {
    this.setState({
      leftNavOpen: !this.state.leftNavOpen
    });
  }

  getStyle() {
    return {
      leftNav: {
        zIndex: this.state.muiTheme.zIndex.appBar -1,
        paddingTop: 64
      },
      root: {
        paddingTop: 64,
        marginLeft: 256
      }
    }
  }

  render(): JSX.Element {
    // console.log(this);
    const {children} = this.props;
    const styles = this.getStyle();
    return (
      <div>
        <AppBarrMenu showMenuIconButton={this.state.showMenuIcon} onLeftIconButtonTouchTap={this.onLeftIconButtonTouchTap} title={this.props.title} />
        <MenuLeftNav styles={styles.leftNav} docked={this.state.docked} open={this.state.leftNavOpen}/>
        <Paper style={styles.root}>
          {this.props.children}
        </Paper>
      </div>
    );
  }
}
