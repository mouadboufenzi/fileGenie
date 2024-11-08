import { describe, it, expect } from 'vitest';
import { render, screen } from '../../testing-utils';
import Home from './home';

describe('Home page', () => {
  it('renders the Home page', () => {
    render(<Home />);
    expect(screen.queryByText(/hello world!/i)).toBeInTheDocument();
  });
});