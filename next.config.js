const { getRedirectStatus } = require('next/dist/lib/load-custom-routes');

module.exports = {
	swcMinify: true,
	reactStrictMode: true,
	images: {
		domains: ['static.biek.org', 'mark.biek.dev', 'i0.wp.com'],
	},
	async redirects() {
		return [
			{
				source: '/links',
				destination: '/contact',
				permanent: true,
			},
			{
				source: '/:year/:month/:slug',
				destination: '/blog/:year/:month/:slug',
				permanent: true,
			},
		];
	},
};
