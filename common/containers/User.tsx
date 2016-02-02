'use strict';

import * as React from 'react';
import AppBarrMenu from '../components/AppBarMenu';
import MenuLeftNav from '../components/MenuLeftNav';
import {Card, CardHeader, CardMedia, CardTitle, CardText, CardActions, FlatButton} from 'material-ui';
import {getMuiTheme} from 'material-ui/lib/styles/theme-manager';
import {ThemeDecorator, LightRawTheme} from 'material-ui/lib/styles/';
import { autobind, filters } from '../services/util';
import Layout from '../components/Layout';
const { Component } = React;

interface IProps {
  cheers: string;
}

interface IState {
  leftNavOpen?: boolean;
  docked?: boolean;
  muiTheme?: any;
}

export default class Home extends Component<IProps, IState> {
  state = {
    leftNavOpen: true,
    docked: true,
    muiTheme: getMuiTheme(LightRawTheme)
  }

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
    console.log(this.state.muiTheme.appBar.zIndex);
    return {
      leftNav: {
        zIndex: this.state.muiTheme.zIndex.appBar -1,
        paddingTop: 64
      },
      root: {
        marginLeft: 256
      }
    }
  }

  render(): JSX.Element {
    const styles = this.getStyle();
    return (
      <Layout title={'Coloquons'}>
        <Card>
          <CardHeader
            title="URL Avatar"
            subtitle="Subtitle"
            avatar="http://lorempixel.com/100/100/nature/"
          />
        </Card>
      </Layout>
    );
  }
}
