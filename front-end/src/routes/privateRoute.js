import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from '../layout';
import { RouteWithLayout } from '../components';
import {
    StoryApproval as StoryApprovalView,
    NotFound as NotFoundView
} from '../views';

const privateRoute = (
<Switch>
    <Route exact path="/login" render={() => <Redirect to="/story-approval" />} />
    <RouteWithLayout layout={Layout} exact path="/story-approval" component={StoryApprovalView} />
    <Route path="/404" component={NotFoundView} />
    <Route path="*" render={() => <Redirect to="/404" />} />
</Switch>
)

export default privateRoute;
