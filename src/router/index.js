import React, { Suspense } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import config from '../config';
import LoadingIndicator from '../components/LoadingIndicator';

import './router.css';

const Router = () => {
    const HomeModule = (React.lazy(() => (import('../containers/home/HomePage'))));
    const NotFoundModule = (React.lazy(() => (import('../containers/not-found/NotFoundPage'))));

    return (
        <div className="body-container">
            <Suspense fallback={<LoadingIndicator />}>
                <Switch>
                    <Route exact path={config.HOME_PAGE} render={(props) => <HomeModule {...props} />} />
                    <Route path="" render={(props) => <NotFoundModule {...props} />} />
                </Switch>
            </Suspense>
        </div>
    );
};

export default withRouter(Router);
