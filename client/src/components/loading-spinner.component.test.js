import { render, screen } from '@testing-library/react';

import LoadingSpinner from './loading-spinner.component';

describe('LoadingSpinner Component', () => {
  it('should display a LoadingSpinner', async () => {
    render(<LoadingSpinner />);

    expect(screen.getByText(/Loading.../)).toBeInTheDocument();
  });
});
