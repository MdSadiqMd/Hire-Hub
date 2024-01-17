/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'icons8.com'
            },
            {
                protocol:'http',
                hostname:'www.w3.org'
            },
        ],
    },
}

module.exports = nextConfig
