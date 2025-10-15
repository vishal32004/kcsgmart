/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.kcsgmart.in',
                // pathname: '/photos/**', // You can use a wildcard to match various paths
            },
        ],
    },
};

export default nextConfig;
