/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "storage.googleapis.com",
            },
            {
                hostname: "storage.cloud.google.com",
            },
            {
                hostname: "generative-placeholders.glitch.me",
            }
        ],
    },
};

export default nextConfig;
