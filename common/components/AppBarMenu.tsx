'use strict';

import * as React from 'react';
import {AppBar, TouchTapEventHandler, IconMenu, MenuItem, IconButton, FontIcon, FlatButton} from 'material-ui';

const { Component } = React;

interface IProps {
  title: string;
  onLeftIconButtonTouchTap: TouchTapEventHandler;
  showMenuIconButton: boolean;
  user: any;
}

export default class AppBarrMenu extends Component<IProps, void> {

  constructor(props){
    super(props);
    if(!this.user) {
      this.user = {username: 'foo bar'};
    }
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
              iconButtonElement= {
                <FlatButton
                  //label={this.props.user.username}
                  linkButton={true}
                  icon={<FontIcon className="icon-person"/>}
                />
              }
              targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
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
