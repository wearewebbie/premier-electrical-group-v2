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

    eleventyConfig.addShortcode('ghlForm', function (formUrl) {
        return `<div class="ghl-form-wrapper"><iframe src="${formUrl}" class="ghl-form-iframe" frameborder="0" scrolling="no"></iframe></div>`;
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

    eleventyConfig.addFilter("isoDate", (dateObj) => {
        if (!dateObj) return "";
        const d = dateObj instanceof Date ? dateObj : new Date(dateObj);
        return d.toISOString().slice(0, 10);
    });

    eleventyConfig.addFilter("formatDate", (dateObj) => {
        if (!dateObj) return "";
        const d = dateObj instanceof Date ? dateObj : new Date(dateObj);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    });

    eleventyConfig.addCollection("posts", (collectionApi) =>
        collectionApi.getFilteredByTag("posts").sort((a, b) => b.data.date - a.data.date)
    );

    eleventyConfig.addCollection("roles", function (collectionApi) {
        return collectionApi
            .getFilteredByGlob("src/roles/*.md")
            .filter((role) => role.data.published)
            .sort((a, b) => a.data.title.localeCompare(b.data.title));
    });

    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("src/admin/config.yml");

    return {
        dir: {
            input: "src",
            output: outputDir,
        },
    };
}