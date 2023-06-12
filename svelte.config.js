import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
				'$lib': '/src/lib',
				'$home': '/src/home',
		}
	}
};

export default config;