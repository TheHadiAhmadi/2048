import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import windicss from 'vite-plugin-windicss';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		prerender: {
			default: true
		},
		adapter: adapter(),
		vite: {
			plugins: [windicss({
				config: {
					shortcuts: {
						'score-btn': 'flex flex-col items-center justify-center py-1 px-6 rounded bg-gray-500 text-white'
					}
				}
			})]
		}
	}
};

export default config;
