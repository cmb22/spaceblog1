/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    // reactStrictMode: true,
    crossOrigin: 'anonymous',
    basePath: '/blog',
    i18n: {
        locales: ["en", "fr", "de", "es"],
        defaultLocale: "en",
        localeDetection: false,
    },
    images: {
        domains: ["localhost", "spaceshipblog.local", "zenlabs.ch"],
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
