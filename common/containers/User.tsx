'use strict';

import * as React from 'react';
import AppBarrMenu from '../components/AppBarMenu';
import MenuLeftNav from '../components/MenuLeftNav';
import * as Highcharts  from 'highcharts';
global.Highcharts = Highcharts;
import {Card, CardHeader, CardMedia, CardTitle, CardText, CardActions, FlatButton} from 'material-ui';
import {getMuiTheme} from 'material-ui/lib/styles/theme-manager';
import {ThemeDecorator, LightRawTheme} from 'material-ui/lib/styles/';
import { autobind, filters } from '../services/util';
import Layout from '../components/Layout';
const { Component } = React;
import * as _ from 'lodash';
import * as ReactHighcharts from 'react-highcharts';

interface IProps {
  cheers: string;
  user: any;
  deputes: any;
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
    const birthDay = {};
    const catSocialePros = {};
    let year ;
    let catSocialePro ;
    const totalDeputes = this.props.deputes.length;
    _.forEach(this.props.deputes, d => {
      year = new Date(d.dateNais).getFullYear();
      catSocialePro = d.catSocialePro || 'sans profession';
      birthDay[year] = birthDay[year] ? ++birthDay[year] : 1;
      catSocialePros[catSocialePro] = catSocialePros[catSocialePro] ? ++ catSocialePros[catSocialePro] : 1;
    });

    const configAges = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Ages'
      },
      yAxis: {
        categories: ['messages']
      },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true
          }
        }
      },
      series: _.map(birthDay, (data, key) => {
        return {name: key, data: [data]}
      })
    };

    const configProfesssion = {
      chart: {
        type: 'pie',
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
      },
      title: {
        text: 'Professsions'
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
         allowPointSelect: true,
         cursor: 'pointer',
         dataLabels: {
           enabled: true,
           format: '<b>{point.name}</b>: {point.percentage:.1f} %',
         }
        }
      },
      series: [{
        name: 'categorie',
        colorByPoint: true,
        data: _.map(catSocialePros, (data, key) => {
          return {name: key, y: (data/totalDeputes)*100, x: data}
        })
      }]
    };



    return (
      <Layout title={'Coloquons'} user={this.props.user}>
        <Card>
          <CardHeader
            title="URL Avatar"
            subtitle="Subtitle"
            avatar="http://lorempixel.com/100/100/nature/"
          />

          <ReactHighcharts config={configAges} />
        </Card>
        <Card>
          <ReactHighcharts config={configProfesssion} />
        </Card>
      </Layout>
    );
  }
}
