import React from 'react';
import { Switch, Route } from 'react-router-dom';

import {
    SignIn as SignInView,
    CreateStory as CreateStoryView,
    StoryList as StoryListView
} from './views';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/signin" component={SignInView} />
            <Route exact path="/create-story" component={CreateStoryView} />
            <Route exact path="/story-list" component={StoryListView} />
        </Switch>
    )
}

export default Routes;