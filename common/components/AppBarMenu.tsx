'use strict';

import * as React from 'react';
import {AppBar, TouchTapEventHandler, IconMenu, MenuItem, IconButton, FontIcon} from 'material-ui';

const { Component } = React;

interface IProps {
  title: string;
  onLeftIconButtonTouchTap: TouchTapEventHandler;
  showMenuIconButton: boolean;
}

export default class AppBarrMenu extends Component<IProps, void> {

  constructor(props){
    super(props);
  }

  render(): JSX.Element {
    return (
      <div>
        <AppBar
          showMenuIconButton={this.props.showMenuIconButton}
          style={{ position: 'fixed'}}
          onLeftIconButtonTouchTap={this.props.onLeftIconButtonTouchTap}
          title={this.props.title}
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton>
                  <FontIcon
                   className="material-icons svg-person"
                  />
                </IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem index={1} href="/logout" primaryText="Sign out" />
              </IconMenu>
          }
        />
      </div>
    );
  }
}
