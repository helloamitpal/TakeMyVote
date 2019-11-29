import React, { Suspense } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import config from '../config';
import LoadingIndicator from '../components/LoadingIndicator';
import Header from '../components/Header';

const Router = () => {
    const HomeModule = (React.lazy(() => (import('../containers/HomePage/Loadable'))));
    const NotFoundModule = (React.lazy(() => (import('../containers/NotFoundPage/Loadable'))));

    return (
        <Suspense fallback={<LoadingIndicator />}>
            <Header />
            <Switch>
                <Route exact path={config.HOME_PAGE} render={(props) => <HomeModule {...props} />} />
                <Route path="" render={(props) => <NotFoundModule {...props} />} />
            </Switch>
        </Suspense>
    );
};

export default withRouter(Router);
