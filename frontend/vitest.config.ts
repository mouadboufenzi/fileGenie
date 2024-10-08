import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
	plugins: [react()],
	test: {
		coverage: {
			provider: 'istanbul',
			reporter: ['text', 'html'],
			thresholds: {
				100: true, // 100% coverage
			}
		},
		environment: 'jsdom',
		globals: true, // automatically inject jest globals (e.g. describe, it, expect)
		setupFiles: ['./src/setup.test.ts'], // setup file to be run before tests
		exclude: [
			'**/node_modules/**',
			'src/setup.test.ts',
		],
	},
})