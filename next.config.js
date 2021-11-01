const { getRedirectStatus } = require('next/dist/lib/load-custom-routes');

module.exports = {
	reactStrictMode: true,
	images: {
		domains: ['static.biek.org'],
	},
	async redirects() {
		return [
			{
				source: '/links',
				destination: '/contact',
				permanent: true,
			},
			{
				source: '/blog/:slug',
				destination: '/:slug',
				permanent: true,
			},
		];
	},
};
