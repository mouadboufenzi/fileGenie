import { API_URL } from '../config';
import { HttpException } from '../types/httpException';
import { showNotification } from './show-notification';

export async function fetchAPI<T extends object>(url: `/api/${string}`, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: Record<string, unknown>) {
  const authToken = JSON.parse(sessionStorage.getItem('filegenie-token') ?? '{ "token": "" }') as { token: string };

  return fetch(`${API_URL}${url}`, {
    method,
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken.token}`,
    },
    body: JSON.stringify(body)
  })
    .then((response) => response.json())
    .then((data: T | HttpException) => {
      if ('error' in data) {
        if (data.error !== 401) showNotification(data.message, false);
        return data;
      }

      return data;
    });
}