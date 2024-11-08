import { describe, it, vi, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../../testing-utils';

import Register from './register';
import * as mod from '../../utils/show-notification';

// Mock `useNavigate` hook from 'react-router-dom'
const mockedUseNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

vi.spyOn(mod, 'showNotification');

describe('Register component', () => {
  it('renders login form with all required fields and buttons', () => {
    render(<Register />);

    expect(screen.getByLabelText(/nom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /s'inscrire/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /vous avez déjà un compte?/i })).toBeInTheDocument();
  });

  it('shows validation errors when form fields are invalid', async () => {
    render(<Register />);

    const submitButton = screen.getByRole('button', { name: /s'inscrire/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/votre nom est requis/i)).toBeInTheDocument();
    expect(await screen.findByText(/email invalide/i)).toBeInTheDocument();
    expect(await screen.findByText(/le mot de passe doit contenir au moins 8 caractères/i)).toBeInTheDocument();
  });

  it('navigates to the login page when "Vous avez déjà un compte?" is clicked', () => {
    render(<Register />);

    const loginButton = screen.getByRole('button', { name: /vous avez déjà un compte?/i });
    fireEvent.click(loginButton);

    expect(mockedUseNavigate).toHaveBeenCalledWith('/login');
  });

  it('handles submission without errors', async () => {
    // @ts-expect-error - for testing purposes
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: 'mock-message' }),
      })
    );

    render(<Register />);

    fireEvent.change(screen.getByLabelText(/nom/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), { target: { value: 'password123' } });

    const submitButton = screen.getByRole('button', { name: /s'inscrire/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'John Doe', email: 'test@example.com', password: 'password123' }),
      });

      expect(mockedUseNavigate).toHaveBeenCalledWith('/login');
      expect(mod.showNotification).toHaveBeenCalledWith('Inscription réussi, connectez-vous!');
    });
  });

  it('handles submission with errors', async () => {
    // @ts-expect-error - for testing purposes
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ error: 401, message: 'mock-message' }),
      })
    );

    render(<Register />);

    fireEvent.change(screen.getByLabelText(/nom/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), { target: { value: 'password123' } });

    const submitButton = screen.getByRole('button', { name: /s'inscrire/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'John Doe', email: 'test@example.com', password: 'password123' }),
      });

      expect(mod.showNotification).toHaveBeenCalledWith('mock-message', false);
    });
  });

});