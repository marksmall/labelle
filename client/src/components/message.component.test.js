import { render, screen } from '@testing-library/react';
import Message from './message.component';

describe('Message Component', () => {
  it('should display error message', () => {
    const message = 'Error message';
    render(<Message variant="danger">{message}</Message>);

    const component = screen.getByRole('alert', { value: message });

    expect(component).toBeInTheDocument();
    expect(component).toHaveAttribute('class', 'fade alert alert-danger show');
  });

  it('should display warning message', () => {
    const message = 'Warning message';
    render(<Message variant="warning">{message}</Message>);

    const component = screen.getByRole('alert', { value: message });

    expect(component).toBeInTheDocument();
    expect(component).toHaveAttribute('class', 'fade alert alert-warning show');
  });

  it('should display success message', () => {
    const message = 'Success message';
    render(<Message variant="success">{message}</Message>);

    const component = screen.getByRole('alert', { value: message });

    expect(component).toBeInTheDocument();
    expect(component).toHaveAttribute('class', 'fade alert alert-success show');
  });
});
