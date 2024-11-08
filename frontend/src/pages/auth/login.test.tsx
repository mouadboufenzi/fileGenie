import { describe, it, vi, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../../testing-utils';

import Login from './login';
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

describe('Login component', () => {
  it('renders login form with all required fields and buttons', () => {
    render(<Login />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /se connecter/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /créer un compte/i })).toBeInTheDocument();
  });

  it('shows validation errors when form fields are invalid', async () => {
    render(<Login />);

    const submitButton = screen.getByRole('button', { name: /se connecter/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/email invalide/i)).toBeInTheDocument();
    expect(await screen.findByText(/le mot de passe doit contenir au moins 8 caractères/i)).toBeInTheDocument();
  });

  it('navigates to the register page when "Créer un compte" is clicked', () => {
    render(<Login />);

    const registerButton = screen.getByRole('button', { name: /créer un compte/i });
    fireEvent.click(registerButton);

    expect(mockedUseNavigate).toHaveBeenCalledWith('/register');
  });

  it('calls showNotification when a valid token is set (or already set)', async () => {
    localStorage.setItem('token', 'mock-token');
    render(<Login />);

    // Wait for the side effect
    await waitFor(() => {
      expect(mod.showNotification).toHaveBeenCalledWith('Vous êtes connecté');
      expect(mockedUseNavigate).toHaveBeenCalledWith('/');
    });

    localStorage.removeItem('token');
  });

  it('handles submission without errors', async () => {
    // @ts-expect-error - tqt, c'est un test
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ token: 'mock-token' }),
      })
    );

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), { target: { value: 'password123' } });

    const submitButton = screen.getByRole('button', { name: /se connecter/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com', password: 'password123', remember: false }),
      });
    });
  });

  it('handles submission with errors', async () => {
    // @ts-expect-error - tqt, c'est un test
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ error: 'mock-error', message: 'mock-message' }),
      })
    );

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), { target: { value: 'password123' } });

    const submitButton = screen.getByRole('button', { name: /se connecter/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com', password: 'password123', remember: false }),
      });
    });
  });
});
