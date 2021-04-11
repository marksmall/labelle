import { render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Header from './header.component';

const mockStore = configureStore();

describe('Header Component', () => {
  let store = null;
  let history = null;

  beforeEach(() => {
    store = mockStore({});
    history = createMemoryHistory({ initialEntries: ['/'] });
  });

  it('should display header', async () => {
    render(<Header />, {
      wrapper: ({ children }) => (
        <Provider store={store}>
          <Router history={history}>{children}</Router>
        </Provider>
      ),
    });

    expect(screen.getByText(/Cart/)).toBeInTheDocument();
  });
});
