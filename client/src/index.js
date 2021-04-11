import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';
import { history } from './root.reducer';

// import './bootstrap.min.css';
import './index.css';
import './app.scss';

import reportWebVitals from './reportWebVitals';
// import installDevTools from './dev-tools/load';

const render = () => {
  const App = require('./app.component').default;

  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          <StrictMode>
            <App />
          </StrictMode>
        </PersistGate>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
  );
};

// installDevTools(() => {
render();
// });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
