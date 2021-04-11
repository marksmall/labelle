import { render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import App from './app.component';

const mockStore = configureStore();

const renderComponent = ({ store, history }) => {
  render(<App />, {
    wrapper: ({ children }) => (
      <Provider store={store}>
        <Router history={history}>{children}</Router>
      </Provider>
    ),
  });
};

describe('Footer Component', () => {
  let store = null;
  let history = null;

  beforeEach(() => {
    store = mockStore({});
    history = createMemoryHistory({ initialEntries: ['/'] });
  });

  it('renders learn react link', () => {
    // renderComponent({ store, history });
    // expect(screen.getByText(/learn react/i)).toBeInTheDocument();
  });
});
