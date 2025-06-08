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
 * @param {string[]} [options.additionalUrls=[]] - Extra URLs to include manually in sitemap
 * @param {string[]} [options.disallow=[]] - Paths to disallow in robots.txt
 */
function seoFilesPlugin(options = {}) {
    const {
        siteUrl,
        generateSitemap = true,
        generateRobots = true,
        exclude = [],
        additionalUrls = [],
        disallow = []
    } = options;

    if (!siteUrl || !/^https?:\/\//.test(siteUrl)) {
        throw new Error('[vite-plugin-seo-files] You must provide a valid siteUrl.');
    }

    return {
        name: 'vite-plugin-seo-files',

        async closeBundle() {
            const distDir = path.resolve(process.cwd(), 'dist');
            const srcRoutesPath = path.resolve(process.cwd(), 'src/routes-list.js');

            if (!fs.existsSync(distDir)) {
                fs.mkdirSync(distDir, { recursive: true });
            }

            // === Sitemap ===
            if (generateSitemap) {
                let urls = '';

                if (fs.existsSync(srcRoutesPath)) {
                    const routes = require(srcRoutesPath);
                    const routeList = routes.default || routes || [];
                    urls = routeList.map(route => {
                        return `
    <url>
        <loc>${siteUrl.replace(/\/$/, '')}${route}</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <priority>${route === '/' ? '1.00' : '0.50'}</priority>
    </url>`;
                    }).join('');
                } else {
                    const files = globSync('**/*.html', {
                        cwd: distDir,
                        ignore: ['404.html', '403.html', ...exclude],
                    });

                    urls = files.map((file) => {
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
                }

                const manualUrls = additionalUrls.map(route => {
                    return `
    <url>
        <loc>${siteUrl.replace(/\/$/, '')}${route}</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <priority>0.50</priority>
    </url>`;
                }).join('');

                const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}${manualUrls}
</urlset>`;

                fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap.trim());
                console.log('✅ sitemap.xml generated');
            }

            // === robots.txt ===
            if (generateRobots) {
                const disallowLines = disallow.length
                    ? disallow.map(path => `Disallow: ${path}`).join('\n')
                    : 'Disallow:';

                const robots = `# https://www.robotstxt.org/

# Allow all crawlers full access
User-agent: *

# Prevent indexing of sensitive or non-public areas
${disallowLines}

# Sitemap file
Sitemap: ${siteUrl.replace(/\/$/, '')}/sitemap.xml`;

                fs.writeFileSync(path.join(distDir, 'robots.txt'), robots);
                console.log('✅ robots.txt generated');
            }
        },
    };
}

module.exports = seoFilesPlugin;