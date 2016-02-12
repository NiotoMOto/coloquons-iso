import * as React from 'react';
import {AutoComplete, ListItem, Table, TableHeader,TableRow, TableHeaderColumn, TableBody, TableRowColumn, Dialog} from 'material-ui';
import * as _ from 'lodash';

const { Component } = React;

interface IProps {
  chartDatas: Array<any>;
}

interface IStats {
  open: any;
}


export default class WordUsed extends Component<IProps, IStats> {

  state = {
    open: {}
  }

  constructor(props){
    super(props);
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps);
    this.setState({
      open: _.zipObject(_.map(nextProps.chartDatas, 'name'), _.map(nextProps.chartDatas, () => { return false; }))
    })
    console.log(_.map(nextProps.chartDatas, 'name'));
    console.log(_.zipObject(_.map(nextProps.chartDatas, 'name'), _.map(nextProps.chartDatas, () => { return false; })));
  }

  open(){

  }

  render(): JSX.Element {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Nombre de mots différents</TableHeaderColumn>
            <TableHeaderColumn>1</TableHeaderColumn>

          </TableRow>
        </TableHeader>
        <TableBody>
        {
          _.map(this.props.chartDatas, user => {
            return  <TableRow key={user.name}>
              <TableRowColumn>{user.name}</TableRowColumn>
              <TableRowColumn>{user.wordCount}</TableRowColumn>
              <TableRowColumn>
                <Dialog
                  title="Dialog With Date Picker"
                  modal={false}
                  open={this.state.open[user]}
                >
                </Dialog>
              </TableRowColumn>
              {
                _.map(user.data[3], w => {
                  return <TableRowColumn key={w.word}><strong>{w.word}</strong> {w.count}</TableRowColumn>
                })
              }
            </TableRow>
          })
        }
        </TableBody>
      </Table>
    );
  }
}
