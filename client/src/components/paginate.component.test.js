import { render, screen } from '@testing-library/react';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Paginate from './paginate.component';

describe('Paginate Component', () => {
  let history = null;

  beforeEach(() => {
    history = createMemoryHistory({ initialEntries: ['/'] });
  });

  it('should display pagination', () => {
    render(<Paginate pages={5} page={2} keyword="?keyword=test&page=2" />, {
      wrapper: ({ children }) => <Router history={history}>{children}</Router>,
    });

    expect(screen.getByText('(current)')).toBeInTheDocument();
    expect(document.querySelectorAll('.page-item').length).toBe(5);
  });
});
