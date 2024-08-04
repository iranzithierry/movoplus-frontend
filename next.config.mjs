/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
            remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
                port: '',
                pathname: '**',
            },
        ],
    },
    async redirects() {
        return [
            {
                source: "/github",
                destination: "https://github.com/iranzithierry",
                permanent: false,
            },
        ];
    },
};

export default nextConfig;
