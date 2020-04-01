import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from '../layout';
import { RouteWithLayout } from '../components'
import {
    CreateStory as CreateStoryView,
    StoryList as StoryListView,
    NotFound as NotFoundView
} from '../views';

const userRoute = (
    <Switch>
        <Route exact path="/login" render={() => <Redirect to="/story-list" />} />
        <RouteWithLayout component={CreateStoryView} exact layout={Layout} path="/create-story" />
        <RouteWithLayout layout={Layout} exact path="/story-list" component={StoryListView} />
        <Route path="/404" component={NotFoundView} />
        <Route path="*" render={() => <Redirect to="/404" />} />
    </Switch>)


export default userRoute;