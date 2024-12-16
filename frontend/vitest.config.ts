import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
	plugins: [react()],
	test: {
		coverage: {
			provider: 'istanbul',
			reporter: ['text', 'html'],
		},
		environment: 'jsdom',
		globals: true, // automatically inject jest globals (e.g. describe, it, expect)
		setupFiles: ['./src/testing-utils/setup.test.ts'], // setup file to be run before tests
		exclude: [
			'**/node_modules/**',
			'src/testing-utils/**',
		],
	},
})