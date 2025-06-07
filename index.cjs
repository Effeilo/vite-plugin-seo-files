// index.cjs
const fs = require('fs');
const path = require('path');
const { globSync } = require('glob');

/**
 * vite-plugin-seo-files (CommonJS version)
 * @param {Object} options
 * @param {string} options.siteUrl - Base URL of the site (required)
 * @param {boolean} [options.generateSitemap=true]
 * @param {boolean} [options.generateRobots=true]
 * @param {string[]} [options.exclude=[]] - Glob patterns to exclude from sitemap
 */
function seoFilesPlugin(options = {}) {
    const {
        siteUrl,
        generateSitemap = true,
        generateRobots = true,
        exclude = []
    } = options;

    if (!siteUrl || !/^https?:\/\//.test(siteUrl)) {
        throw new Error('[vite-plugin-seo-files] You must provide a valid siteUrl.');
    }

    return {
        name: 'vite-plugin-seo-files',

        closeBundle() {
            const distDir = path.resolve(process.cwd(), 'dist');

            if (!fs.existsSync(distDir)) {
                fs.mkdirSync(distDir, { recursive: true });
            }

            // === Sitemap ===
            if (generateSitemap) {
                const files = globSync('**/*.html', {
                    cwd: distDir,
                    ignore: ['404.html', '403.html', ...exclude],
                });

                const urls = files.map((file) => {
                    const loc = `${siteUrl.replace(/\/$/, '')}/${file.replace(/index\.html$/, '').replace(/\\/g, '/')}`;
                    const stats = fs.statSync(path.join(distDir, file));
                    const lastmod = stats.mtime.toISOString().split('T')[0];
                    const priority = file === 'index.html' ? '1.00' : '0.50';

                    return `
    <url>
        <loc>${loc}</loc>
        <lastmod>${lastmod}</lastmod>
        <priority>${priority}</priority>
    </url>`;
                }).join('');

                const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;

                fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap.trim());
                console.log('✅ sitemap.xml generated');
            }

            // === robots.txt ===
            if (generateRobots) {
                const robots = `# https://www.robotstxt.org/

User-agent: *
Disallow:

Sitemap: ${siteUrl.replace(/\/$/, '')}/sitemap.xml`;

                fs.writeFileSync(path.join(distDir, 'robots.txt'), robots);
                console.log('✅ robots.txt generated');
            }
        },
    };
}

module.exports = seoFilesPlugin;