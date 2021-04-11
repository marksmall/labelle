import { render, screen } from '@testing-library/react';

import Footer from './footer.component';

describe('Footer Component', () => {
  it('should display footer', async () => {
    render(<Footer />);

    expect(screen.getByText(/Copyright/)).toBeInTheDocument();
    expect(screen.getByText(/Labelle Beauty/)).toBeInTheDocument();
  });
});
