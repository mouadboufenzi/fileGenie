import { describe, it, expect, vi } from 'vitest';
import { fetchAPI } from './fetch';
import { showNotification } from './show-notification';

vi.mock('./show-notification', () => ({
  showNotification: vi.fn(),
}));

describe('fetchAPI', () => {
  const mockFetch = vi.fn();
  global.fetch = mockFetch;

  describe('The token is defined in session storage', () => {
    beforeEach(() => {
      const mockToken = JSON.stringify({ token: 'test-token' });
      sessionStorage.setItem('filegenie-token', mockToken);
    });

    afterEach(() => {
      sessionStorage.removeItem('filegenie-token');
      vi.resetAllMocks();
    });

    it('should call fetch with correct parameters for GET request', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => ({ data: 'test' }),
      });
  
      const response = await fetchAPI('/api/test', 'GET');
  
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:8080/api/test', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-token',
        },
        body: undefined,
      });
      expect(response).toEqual({ data: 'test' });
    });
  
    it('should call fetch with correct parameters for POST request', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => ({ data: 'test' }),
      });
  
      const response = await fetchAPI('/api/test', 'POST', { key: 'value' });
  
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:8080/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-token',
        },
        body: JSON.stringify({ key: 'value' }),
      });
      expect(response).toEqual({ data: 'test' });
    });
  
    it('should show notification on error response', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => ({ error: 400, message: 'Bad Request' }),
      });
  
      const response = await fetchAPI('/api/test', 'GET');
  
      expect(showNotification).toHaveBeenCalledWith('Bad Request', false);
      expect(response).toEqual({ error: 400, message: 'Bad Request' });
    });
  
    it('should not show notification on 401 error response', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => ({ error: 401, message: 'Unauthorized' }),
      });
  
      const response = await fetchAPI('/api/test', 'GET');
  
      expect(showNotification).not.toHaveBeenCalled();
      expect(response).toEqual({ error: 401, message: 'Unauthorized' });
    });

  });

  describe('The token is not defined in session storage', () => {
    beforeEach(() => {
      sessionStorage.removeItem('filegenie-token');
    });

    afterEach(() => {
      vi.resetAllMocks();
    });

    it('should call fetch with empty token', async () => {

      mockFetch.mockResolvedValueOnce({
        json: () => ({ data: 'test' }),
      });

      await fetchAPI('/api/test', 'GET');
  
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:8080/api/test', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ',
        },
        body: undefined,
      });

    });
  });
});