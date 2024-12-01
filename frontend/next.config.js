const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    optimizeFonts: false,
};

module.exports = withNextIntl(nextConfig);
