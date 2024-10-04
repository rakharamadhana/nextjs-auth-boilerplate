const withPWA = require("next-pwa")({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
    skipWaiting: true,
});

const { default: classnamesMinifier } = require('@nimpl/classnames-minifier');
const { PHASE_PRODUCTION_SERVER, PHASE_DEVELOPMENT_SERVER } = require('next/constants');

/** @type {import('next').NextConfig} */
const baseNextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
};

// Export a function to handle both PWA and classnames minifier
module.exports = (phase) => {
    const isProductionServer = phase === PHASE_PRODUCTION_SERVER;
    const isDevelopmentServer = phase === PHASE_DEVELOPMENT_SERVER;

    // Classnames Minifier Configuration
    const minifierConfig = classnamesMinifier({
        prefix: '_', // Minified classname prefix
        reservedNames: ['_en', '_de'], // List of classnames that should not be minified
        disabled: isDevelopmentServer || isProductionServer, // Disable minifier in development and production server
    })(baseNextConfig);

    // Combine with PWA
    return withPWA(minifierConfig);
};
