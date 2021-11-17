const { getRedirectStatus } = require('next/dist/lib/load-custom-routes');

module.exports = {
	swcMinify: true,
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
				source: '/blog/:year/:month/:slug',
				destination: '/:year/:month/:slug',
				permanent: true,
			},
		];
	},
};
