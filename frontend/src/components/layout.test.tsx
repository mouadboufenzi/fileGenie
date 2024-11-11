import { describe, it, expect } from 'vitest';
import { render, screen, userEvent } from '../testing-utils';
import { Layout } from './layout';

describe('Layout component', () => {
  it('renders only children', () => {
    render(<Layout>Hello</Layout>);
    expect(screen.queryByText('FileGenie')).not.toBeInTheDocument();
  });

  describe('when token is set', () => {
    beforeAll(() => {
      localStorage.setItem('token', 'test');
    });

    it('renders layout with children', () => {
      render(<Layout>Hello</Layout>);
      expect(screen.queryByText('FileGenie')).toBeInTheDocument();
    });

    it('redirect to profile when user profile icon is clicked', async () => {
      render(<Layout>Hello</Layout>);

      const profileIcon = screen.getByTestId('profile-icon');
      expect(profileIcon).toBeInTheDocument();

      await userEvent.click(profileIcon);
      
      expect(window.location.href).toBe('/profile');
    });

    it('redirect to main page when user click on the logo', async () => {
      render(<Layout>Hello</Layout>);

      const logo = screen.getByTestId('logo');
      expect(logo).toBeInTheDocument();

      await userEvent.click(logo);

      expect(window.location.href).toBe('/');
    });

    afterAll(() => {
      localStorage.removeItem('token');
    });
  });

 
});
