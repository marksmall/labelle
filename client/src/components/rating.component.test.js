import { render, screen } from '@testing-library/react';

import Rating from './rating.component';

describe('Rating Component', () => {
  it('should display no star and text', async () => {
    render(<Rating value={0.3} text="0.3 Star Rating" color="#f8e825" />);

    expect(screen.getByText(/0.3 Star Rating/)).toBeInTheDocument();
    expect(document.querySelector('svg')).not.toBeInTheDocument();
  });

  it('should display half a star and text', async () => {
    render(<Rating value={0.5} text="0.5 Star Rating" color="#f8e825" />);

    expect(screen.getByText(/0.5 Star Rating/)).toBeInTheDocument();
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('should display star and text', async () => {
    render(<Rating value={1} text="1 Star Rating" color="#f8e825" />);

    expect(screen.getByText(/1 Star Rating/)).toBeInTheDocument();
    expect(document.querySelectorAll('svg').length).toBe(1);
  });

  it('should display maximum 5 stars and text', async () => {
    render(<Rating value={6} text="6 Star Rating" color="#f8e825" />);

    expect(screen.getByText(/6 Star Rating/)).toBeInTheDocument();
    expect(document.querySelectorAll('svg').length).toBe(5);
  });
});
