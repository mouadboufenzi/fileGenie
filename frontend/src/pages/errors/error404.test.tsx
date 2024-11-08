import { describe, it, expect } from 'vitest';
import { render, screen } from '../../testing-utils';
import Error404 from './error404';

describe('Error404 page', () => {
  it('renders the Error404 page', () => {
    render(<Error404 />);
    expect(screen.queryByText(/la page que vous cherchez est introuvable/i)).toBeInTheDocument();
  });
});