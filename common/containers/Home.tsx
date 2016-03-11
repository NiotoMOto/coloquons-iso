'use strict';

import * as React from 'react';
import * as Highcharts  from 'highcharts';
global.Highcharts = Highcharts;
import {Paper, RaisedButton, CircularProgress, FontIcon,Card, CardHeader, CardText, CardActions, LinearProgress} from 'material-ui';
import { autobind, filters } from '../services/util';
import processData from '../services/hangoutParser';
import Layout from '../components/Layout';
import SelectUser from '../components/SelectUser';
import WordsUsed from '../components/WordsUsed';
import * as ReactHighcharts from 'react-highcharts';
const { Component } = React;
import * as _ from 'lodash';

interface IProps {
  cheers: string;
  user: any;
}

interface IStates {
  chartDatas?: any;
  hasFile?: boolean;
  completed?: number;
}

export default class Home extends Component<IProps, IStates> {
  state = {
    chartDatas: [],
    hasFile: false,
    completed: 0
  }
  constructor(props){
    super(props);
    autobind(this, filters.listeners);
  }

  refs: {
    [key: string]: HTMLInputElement
  }

  onFileChange(e) {
    const file = e.target.files[0];
    let Hangouts= {};
    if (file) {
      this.setState({completed: 0});
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = evt => {
        Hangouts = JSON.parse(evt.target.result);
        const chartDatas = processData(Hangouts);
        this.setState(
          {
            chartDatas,
            hasFile: true
          }
        );
      }
      reader.onprogress = data => {
        if (data.lengthComputable) {
            // var progress = parseInt( ((data.loaded / data.total) * 100), 10 );
            // this.setState({completed: progress});
        }
      }
      reader.onerror = function (evt) {
        alert("Error reading file");
      }
    }
  }

  render(): JSX.Element {
    const styles = {
      button: {
        margin: 12,
      },
      exampleImageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
      },
    };
    let chartMessages = <div></div>;
    let chartCharacters = <div></div>;
    let chartMedias = <div></div>;
    if(this.state.hasFile){
      const configMessages = {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Messages'
        },
        wAxis: {
          categories: ['messages']
        },
        plotOptions: {
          column: {
            dataLabels: {
              enabled: true
            }
          }
        },
        series: _.map(this.state.chartDatas, data => {
          return {name: data.name, data: [data.data[0]]}
        })
      }
      const configCharacters = {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Caractères'
        },
        wAxis: {
          categories: ['Caractères']
        },
        plotOptions: {
          column: {
            dataLabels: {
              enabled: true
            }
          }
        },
        series: _.map(this.state.chartDatas, data => {
          return {name: data.name, data: [data.data[1]]}
        })
      }
      const cofigMedias = {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Médias'
        },
        wAxis: {
          categories: ['Médias']
        },
        plotOptions: {
          column: {
            dataLabels: {
              enabled: true
            }
          }
        },
        series: _.map(this.state.chartDatas, data => {
          return {name: data.name, data: [data.data[2]]}
        })
      }
      chartMessages = <ReactHighcharts config={configMessages} />
      chartCharacters = <ReactHighcharts config={configCharacters} />
      chartMedias = <ReactHighcharts config={cofigMedias} />
    }
    return (
      <Layout title={'Coloquons'} user={this.props.user}>
        <SelectUser/>
        <Card>
          <CardHeader
            title="Hangout Stats"
          />
          <CardText>
            <p>
              Pour avoir des stats sur vos conversations hangouts télécharger
              votre historique sur <a href="https://takeout.google.com/settings/takeout" target="_blank">takeout hangaout</a>,
              et charger le avec le bouton ci-dessous.
            </p>
          </CardText>
           <CardActions>
             <RaisedButton
               label="hangout file"
               style={styles.button}
               icon={<FontIcon className="icon-file"/>}>
               <input type="file" style={styles.exampleImageInput} onChange={this.onFileChange}/>
             </RaisedButton>
             <LinearProgress mode="determinate" value={this.state.completed} />
           </CardActions>
        </Card>
        <Paper>
          {chartMessages}
        </Paper>
        <Paper>
          {chartCharacters}
        </Paper>
        <Paper>
          {chartMedias}
        </Paper>
        <WordsUsed chartDatas={this.state.chartDatas} />
      </Layout>
    );
  }
}
