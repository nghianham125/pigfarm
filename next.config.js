/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },
    experimental: {
        optimizeCss: true,
    },
    webpack: (config) => {
        config.optimization.splitChunks.cacheGroups = {
            commons: {
                name: 'commons',
                chunks: 'initial',
                minChunks: 2,
            },
        };
        return config;
    },
};

module.exports = nextConfig; 