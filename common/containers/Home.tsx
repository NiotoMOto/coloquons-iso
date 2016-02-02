'use strict';

import * as React from 'react';
import {Card, CardHeader, CardMedia, CardTitle, CardText, CardActions, FlatButton} from 'material-ui';
import { autobind, filters } from '../services/util';
import Layout from '../components/Layout';
const { Component } = React;

interface IProps {
  cheers: string;
}

export default class Home extends Component<IProps, void> {

  constructor(props){
    super(props);
    autobind(this, filters.listeners);
  }

  render(): JSX.Element {
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
