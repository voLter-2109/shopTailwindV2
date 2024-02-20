/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	env: {
		SERVER_URL: process.env.SERVER_URL,
		APP_URL: process.env.APP_URL
	},
	
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**.com',
				port: '',
				pathname: '**'
			}
		]
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')]
	}
}

module.exports = nextConfig

// async rewrites() {
// 	return [
// 		{
// 			sourse: '/uploads/:path*',
// 			destination: 'http://localhost:3000/uploads/:path*'
// 		}
// 	]
// }

// headers:{
// 	source: '/admin/:path*',
// 	headers: [
// 		{
// 		  key: 'Cache-Control',
// 		  value: 'no-store',
// 		},
// 	  ],
// },
