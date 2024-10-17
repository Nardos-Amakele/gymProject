// next.config.js
/** @type {import('next').NextConfig} */
module.exports = {
    i18n: {
        // List of supported locales (languages)
        locales: ['en', 'am'], // Add more languages as needed
        // Default locale used when visiting a non-locale prefixed path
        defaultLocale: 'en',
    },
};
