import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from './Main';
import ApiManage from './api/views/apiContainers';
import ProjectManage from './project/views/projectContainers';
import UserManage from './user/views/userContainers';

const Router = () => (
    <BrowserRouter>
        <Main>
            <Switch>
                <Route exact={true} path="/" component={ApiManage} />
                <Route path="/apiManage" component={ApiManage} />
                <Route path="/projectManage" component={ProjectManage} />
                <Route path="/userManage" component={UserManage} />
            </Switch>
        </Main>
    </BrowserRouter>
);

export default Router;