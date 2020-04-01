import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import privateRoute from './privateRoute';
import userRoute from './userRoute';
import {
    Login as LoginInView,
} from '../views';
import { LoginRedux } from '../redux/actions';

const { mapStateToProps, mapDispatchToProps } = LoginRedux

const loginRoute = 
    <Switch>
        <Route exact path="/login" component={LoginInView} />
        <Route path="*" render={() => <Redirect to="/login" />} />
    </Switch>

class Routes extends React.Component {
    componentDidMount() {
        if (!this.props.user && localStorage.getItem('jwt'))
            this.props.loadUser()
    }
    render() {
        return this.props.loading ? 
             (<Backdrop open={this.props.loading}>
                <CircularProgress color="inherit" />
            </Backdrop>)
            : (this.props.user && this.props.user.roles.includes("Admin")) ? privateRoute
                : this.props.user ? userRoute
                    : loginRoute
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
