import { describe, it, expect } from 'vitest';
import { render, screen } from '../testing-utils';
import { ProtectedRoute } from './protected-route';

describe('ProtectedRoute component', () => {
  beforeAll(() => {
    localStorage.setItem('token', 'test');
  });

  afterAll(() => {
    localStorage.removeItem('token');
  });

  it('renders route properly', () => {
    render(<ProtectedRoute>Hello</ProtectedRoute>);
    expect(screen.queryByText('Hello')).toBeInTheDocument();
  });
});