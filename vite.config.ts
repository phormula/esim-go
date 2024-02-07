import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
				@import 'bootstrap/scss/functions';
				@import 'bootstrap/scss/variables';
				@import 'bootstrap/scss/variables-dark';
				@import 'bootstrap/scss/mixins';
					`
			}
		}
	}
});
