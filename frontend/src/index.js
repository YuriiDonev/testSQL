// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
//
// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();


import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { Route, Switch, Redirect } from 'react-router';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import reduxThunk from 'redux-thunk';

import './index.css';
import App from './App';
import Cars from './cars';

import reducers from './reducers';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  compose(
    applyMiddleware(middleware, reduxThunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/cars' component={Cars} />
        <Redirect to='/'/>
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
