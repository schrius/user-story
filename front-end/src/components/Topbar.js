import React from 'react';
import { AppBar, Toolbar, Button} from '@material-ui/core';
import { LOGOUT} from '../constants/actionTypes';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
    handleLogin: () => {dispatch({ type: LOGOUT})}
})

const Topbar = props => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" onClick={props.handleLogin}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default connect(null, mapDispatchToProps)(Topbar);