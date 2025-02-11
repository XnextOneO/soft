import createNextIntlPlugin from "next-intl/plugin";
import bundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const config = {
    reactStrictMode: false,
    eslint: {
        ignoreDuringBuilds: true,
    },
    experimental: {
        optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
    },
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    webpack: (webpackConfig) => {
        webpackConfig.module.rules.push({
            test: /\.svg$/,
            use: [
                {
                    loader: "@svgr/webpack",
                    options: {
                        svgo: true, // Optimize SVGs
                        svgoConfig: {
                            plugins: [
                                {
                                    name: "removeViewBox",
                                    active: false, // Keep the viewBox attribute for responsiveness
                                },
                            ],
                        },
                    },
                },
            ],
        });

        const rules = webpackConfig.module.rules
            .find((rule) => typeof rule.oneOf === "object")
            .oneOf.filter((rule) => Array.isArray(rule.use));
        for (const rule of rules) {
            for (const moduleLoader of rule.use) {
                if (
                    moduleLoader.loader !== undefined &&
                    moduleLoader.loader.includes("css-loader") &&
                    typeof moduleLoader.options.modules === "object"
                ) {
                    moduleLoader.options = {
                        ...moduleLoader.options,
                        modules: {
                            ...moduleLoader.options.modules,
                            // This is where we allow camelCase class names
                            exportLocalsConvention: "camelCase",
                        },
                    };
                }
            }
        }

        return webpackConfig;
    },
};

const withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
});

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const withBundleAnalyzerPlugin = withBundleAnalyzer(config);

export default withNextIntl(withBundleAnalyzerPlugin);
