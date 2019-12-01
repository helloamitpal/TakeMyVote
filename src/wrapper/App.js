import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Router from '../router';
import configureStore from '../stores/configureStores';
import config from '../config';
import Header from '../components/header';

import './app.css';

// main root component
class App extends Component {
    constructor() {
        super();
        // initializing redux store
        const { store } = configureStore()(this.onRehydrate);
        this.state = {
            store,
            rehydrated: false
        };
    }

    // callback function to get notified that redux store configuration is completed
    onRehydrate = () => {
        this.setState({ rehydrated: true });
    }

    render() {
        const { store, rehydrated } = this.state;

        // rendering router once the redux store is prepared
        const content = rehydrated ? (
            <div className="app-container">
                <Provider store={store} key={config.STORAGE_KEY}>
                    <Header />
                    <BrowserRouter>
                        <Router />
                    </BrowserRouter>
                </Provider>
            </div>
        ) : null;

        return content;
    }
}

export default App;
