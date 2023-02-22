/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async exportPathMap() {
        return {
            '/': { page: '/' },
        };
    },
    webpack: (config) => {

        config.resolve.alias['dns'] = 'dns-browserify'; // adiciona esse alias
        return config;
    },
}

module.exports = nextConfig