import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from './layout';
import { RouteWithLayout } from './components'
import { connect } from 'react-redux';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    Login as LoginInView,
    CreateStory as CreateStoryView,
    StoryList as StoryListView,
    StoryApproval as StoryApprovalView,
    NotFound as NotFoundView
} from './views';
import { LoginRedux } from './redux/actions';

const { mapStateToProps, mapDispatchToProps} = LoginRedux

class Routes extends React.Component{
    componentDidMount() {
        if( !this.props.user && localStorage.getItem('jwt'))
            this.props.loadUser()
    }
    render() {
        if(this.props.loading){
            return (
                <Backdrop open={this.props.loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            )
        } else if(this.props.user && this.props.user.roles.includes("Admin")) {
            return (
                <Switch>
                    <Route exact path="/login" render={() => <Redirect to="/story-approval" />} />
                    <RouteWithLayout layout={Layout} exact path="/story-approval" component={StoryApprovalView} />
                    <Route path="/404" component={NotFoundView} />
                    <Route path="*" render={() => <Redirect to="/404" />} />
                </Switch>
            )
        } else if(this.props.user){
            return (
                <Switch>
                    <Route exact path="/login" render={() => <Redirect to="/story-list" />} />
                    <RouteWithLayout component={CreateStoryView} exact layout={Layout} path="/create-story" />
                    <RouteWithLayout layout={Layout} exact path="/story-list" component={StoryListView} />
                    <Route path="/404" component={NotFoundView} />
                    <Route path="*" render={() => <Redirect to="/404" />} />
                </Switch>
            )
        } else {
            return (
                <Switch>
                    <Route exact path="/login" component={LoginInView} />
                    <Route path="*" render={() => <Redirect to="/login" />} />
                </Switch>
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);

/*
{
    user = login.user
    if(user.userRoles.includes('Admin')){
        return (
            <Switch>
                <Route exact path="/login" render={() => <Redirect to="/story-approval" />} />
                <RouteWithLayout layout={Layout} exact path="/story-approval" component={StoryApprovalView} />
                <Route path="/404" component={NotFoundView} />
                <Route path="*" render={() => <Redirect to="/404" />} />
            </Switch>
        )
    } else {
        return (
            
            <Switch>
                <Route exact path="/login" render={() => <Redirect to="/story-list" />} />
                <RouteWithLayout component={CreateStoryView} exact layout={Layout} path="/create-story" />
                <RouteWithLayout layout={Layout} exact path="/story-list" component={StoryListView} />
                <Route path="/404" component={NotFoundView} />
                <Route path="*" render={() => <Redirect to="/404" />} />
            </Switch>
        )
    }
} else


*/