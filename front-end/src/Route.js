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
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const mapStateToProps = state => ({ ...state })

const Routes = (props) => {
    const classes = useStyles();
    const { login } = props
    if (login.loading) {
        return (
            <Backdrop className={classes.backdrop} open={login.loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    } else if (login.user || localStorage.getItem('user')) {
        user = login.user || JSON.parse(localStorage.getItem('user'))
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
    } else return (
        <Switch>
            <Route exact path="/login" component={LoginInView} />
            <Route path="*" render={() => <Redirect to="/login" />} />
        </Switch>
    )
}

export default connect(mapStateToProps, null)(Routes);