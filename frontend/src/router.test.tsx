import { describe, it, expect } from 'vitest';
import { createMemoryRouter } from 'react-router-dom';
import { route, screen } from './testing-utils';
import { router } from './router';

describe('router', () => {
	it('should render the App component for the root path', () => {
		const testRouter = createMemoryRouter(router.routes, {
			initialEntries: ['/'],
		});

		route(testRouter);
		expect(screen.debug);
	});

	it('should render the Error404 component for an unknown path', () => {
		const testRouter = createMemoryRouter(router.routes, {
			initialEntries: ['/unknown'],
		});

		route(testRouter);
		expect(screen.getByText("La page que vous cherchez est introuvable")).toBeInTheDocument();
	});
});