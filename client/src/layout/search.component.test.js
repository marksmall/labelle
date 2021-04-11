import { render, screen } from '@testing-library/react';

import Search from './search.component';

describe('Search Component', () => {
  it('should renders search form', () => {
    render(<Search />);

    // expect(screen.getByText(/learn react/i)).toBeInTheDocument();
  });
});
