import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        globasl: true,
        environment: 'jsdom',
        css: true,
        setupFiles: './vitest.setup.js',
        coverage: {
            reporter: ['text', 'json', 'html'],
        },
    },
})
