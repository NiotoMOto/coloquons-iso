'use strict';

import * as React from 'react';
import {LeftNav, ListItem} from 'material-ui';

const { Component } = React;

interface IProps {
  open: boolean;
  docked?: boolean;
  styles?: any;
}



export default class AppbBarMenu extends Component<IProps, void> {

  constructor(props){
    super(props);
  }

  onClickLink(data, d) {
    console.log(data, d);
  }

  onclickItem(e) {
    document.location.href = '/user';
  }

  render(): JSX.Element {
    const props = {
     open: this.props.open,
     docked: this.props.docked,
     style: this.props.styles
    };
    return (
      <div>
        <LeftNav {...props}>
         <ListItem href="/" key={1} primaryText="Hangouts" />
         <ListItem href="/user" key={2} primaryText="Utilisateur" />
        </LeftNav>
      </div>
    );
  }
}
