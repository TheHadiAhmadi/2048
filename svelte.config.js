import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import windicss from 'vite-plugin-windicss';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		vite: {
			plugins: [windicss({
				config: {
					theme: {
						extend: {
							animation: {
								'appear': 'appear .2s linear infinite',
								'wiggle': 'wiggle .2s linear infinite',
							},
							keyframes: {
								appear: {
									'100%': {transform: 'scale(1)'},
									'0%': {transform: 'scale(0)'},
								},
								wiggle: {
									'0%, 100%': { transform: 'rotate(-3deg)' },
									'50%': { transform: 'rotate(3deg)' },
								  },
							}
						}
					},
					shortcuts: {
						'score-btn': 'flex flex-col items-center justify-center py-1 px-6 rounded bg-gray-500 text-white'
					}
				}
			})]
		}
	}
};

export default config;
