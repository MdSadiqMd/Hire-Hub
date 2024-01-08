/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'icons8.com'
            },
        ],
    },
}

module.exports = nextConfig
