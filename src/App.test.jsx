
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the main heading', () => {
    render(<App />);
    const headingElement = screen.getByText(/Go to Home/i);
    expect(headingElement).toBeInTheDocument();
  });
});
