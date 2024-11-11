import { HttpException } from '../types/httpException';
import { showNotification } from './show-notification';

export async function fetchAPI<T extends object>(url: `/api/${string}`, method: 'GET' | 'POST', body?: Record<string, unknown>) {
  
  // TODO: move url to .env
  return fetch(`http://localhost:8080${url}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
    .then((response) => response.json())
    .then((data: T | HttpException) => {
      if ('error' in data) {
        showNotification(data.message, false);
        return data;
      }

      return data;
    });
}