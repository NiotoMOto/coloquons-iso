import * as React from 'react';
import {AutoComplete, ListItem, Table, TableHeader,TableRow, TableHeaderColumn, TableBody, TableRowColumn, Dialog, RaisedButton} from 'material-ui';
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

  onhandleOpen(user) {
    const open = this.state.open;
    open[user.name] = true;
    this.setState({open});
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.chartDatas.length){
      this.setState({
        open: _.zipObject(_.map(nextProps.chartDatas, 'name'), _.map(nextProps.chartDatas, () => { return false; }))
      });
      console.log(this.state);
      console.log(_.map(nextProps.chartDatas, 'name'));
      console.log(_.zipObject(_.map(nextProps.chartDatas, 'name'), _.map(nextProps.chartDatas, () => { return false; })));
    }
  }

  open(){

  }

  render(): JSX.Element {
    console.log(this.state);
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
            this.onhandleOpen = this.onhandleOpen.bind(this, user);
            return  <TableRow key={user.name}>
                      <TableRowColumn>{user.name}</TableRowColumn>
                      <TableRowColumn>{user.wordCount}</TableRowColumn>
                      <TableRowColumn>
                        <RaisedButton label="Dialog" onTouchTap={this.onhandleOpen} />
                      </TableRowColumn>
                      <TableRowColumn>
                        <Dialog
                          title="Dialog With Date Picker"
                          modal={false}
                          open={this.state.open[user.name]}>
                          {
                            _.map(user.data[3], w => {
                              return <p><strong>{w.word}</strong> {w.count}</p>
                            })
                          }
                        </Dialog>
                      </TableRowColumn>
                    </TableRow>
          })
        }
        </TableBody>
      </Table>
    );
  }
}
