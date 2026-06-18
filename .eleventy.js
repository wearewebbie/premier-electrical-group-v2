import Image from '@11ty/eleventy-img';
import fs from "fs";
import path from "path";

export default function (eleventyConfig) {

    const isProd = process.env.CF_PAGES_BRANCH === 'main';
    const baseUrl = isProd
        ? 'https://clientdomain.com'
        : process.env.CF_PAGES_URL || 'http://localhost:8080';

    const outputDir = "dist";

    eleventyConfig.addGlobalData("baseUrl", baseUrl);
    eleventyConfig.addGlobalData("isProd", isProd);

    eleventyConfig.addShortcode('image', async function (src, alt, cls, options = {}) {
        const {
            widths = [400, 800, 1200],
            formats = ['avif', 'webp', 'jpeg'],
            sizes = '100vw',
        } = options;

        const metadata = await Image(src, {
            widths,
            formats,
            outputDir: `./${outputDir}/assets/images/`,
            urlPath: '/assets/images/',
            filenameFormat: function (id, src, width, format) {
                const name = path.basename(src, path.extname(src));
                return `${name}-${width}w.${format}`;
            }
        });

        return Image.generateHTML(metadata, {
            alt,
            class: cls,
            sizes,
            loading: 'lazy',
            decoding: 'async',
        });
    });

    eleventyConfig.addFilter("lastModifiedDate", function (filePath) {
        const stats = fs.statSync(filePath);
        return stats.mtime.toISOString().split("T")[0];
    });

    eleventyConfig.addLiquidFilter("dateFormat", function (date) {
        return new Date(date).toISOString().split("T")[0];
    });

    eleventyConfig.addCollection("debugUrls", function (collectionApi) {
        return collectionApi.getAll().map(item => {
            return item;
        });
    });

    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPassthroughCopy("src/assets/svgs");
    eleventyConfig.addPassthroughCopy("src/assets/favicon");
    eleventyConfig.addPassthroughCopy("src/assets/fonts");
    eleventyConfig.addPassthroughCopy("src/assets/swiper");
    eleventyConfig.addPassthroughCopy("src/assets/images/website-preview-image.png");

    return {
        dir: {
            input: "src",
            output: outputDir,
        },
    };
}