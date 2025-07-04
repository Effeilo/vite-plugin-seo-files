import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import { pathToFileURL } from 'url';
import type { Plugin } from 'vite';

interface SeoFilesPluginOptions {
    siteUrl: string;
    generateSitemap?: boolean;
    generateRobots?: boolean;
    exclude?: string[];
    additionalUrls?: string[];
    disallow?: string[];
}

export default function seoFilesPlugin(options: SeoFilesPluginOptions): Plugin {
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
          const routesModule = await import(pathToFileURL(srcRoutesPath).href);
          const routes: string[] = routesModule.default || [];
          urls = routes.map(route => `
  <url>
    <loc>${siteUrl.replace(/\/$/, '')}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>${route === '/' ? '1.00' : '0.50'}</priority>
  </url>`).join('');
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

        const manualUrls = additionalUrls.map(route => `
  <url>
    <loc>${siteUrl.replace(/\/$/, '')}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.50</priority>
  </url>`).join('');

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}${manualUrls}
</urlset>`;

        fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap.trim());
        console.log('✅ sitemap.xml generated');
      }

      // === robots.txt ===
      if (generateRobots) {
        const disallowLines = disallow.length
          ? disallow.map(p => `Disallow: ${p}`).join('\n')
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