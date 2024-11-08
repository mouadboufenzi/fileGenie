/* eslint-disable @typescript-eslint/no-empty-function */

import { vi, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

import '@testing-library/jest-dom/vitest';

// eslint-disable-next-line @typescript-eslint/unbound-method
const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);

window.HTMLElement.prototype.scrollIntoView = () => {};

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
});

Object.defineProperty(window, 'location', {
  writable: true,
  value: {
    href: '',
    assign: vi.fn(),
  },
});

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});