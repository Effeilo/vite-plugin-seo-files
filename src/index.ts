import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import { pathToFileURL } from 'url';
import type { Plugin, ResolvedConfig } from 'vite';

interface SeoFilesPluginOptions {
    siteUrl: string;
    generateSitemap?: boolean;
    generateRobots?: boolean;
    exclude?: string[];
    additionalUrls?: string[];
    disallow?: string[];
    routesFile?: string;
}

export default function seoFilesPlugin(options: SeoFilesPluginOptions): Plugin {
  const {
    siteUrl,
    generateSitemap = true,
    generateRobots = true,
    exclude = [],
    additionalUrls = [],
    disallow = [],
    routesFile,
  } = options;

  if (!siteUrl || !/^https?:\/\//.test(siteUrl)) {
    throw new Error('[vite-plugin-seo-files] You must provide a valid siteUrl.');
  }

  let outDir: string;

  return {
    name: 'vite-plugin-seo-files',

    configResolved(config: ResolvedConfig) {
      outDir = path.resolve(config.root, config.build.outDir);
    },

    async closeBundle() {
      const distDir = outDir ?? path.resolve(process.cwd(), 'dist');
      const srcRoutesPath = routesFile
        ? path.resolve(process.cwd(), routesFile)
        : path.resolve(process.cwd(), 'src/routes-list.js');

      if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
      }

      if (generateSitemap || generateRobots) {
        console.log(`\n----------------------------------------
🔍  BrowserUX SEO Files
----------------------------------------`)
      }

      // === Sitemap ===
      if (generateSitemap) {
        const urlSet = new Set<string>();
        const urlEntries: { loc: string; lastmod: string; priority: string }[] = [];
        const today = new Date().toISOString().split('T')[0];
        const base = siteUrl.replace(/\/$/, '');

        const addUrl = (loc: string, lastmod: string, priority: string) => {
          if (!urlSet.has(loc)) {
            urlSet.add(loc);
            urlEntries.push({ loc, lastmod, priority });
          }
        };

        if (fs.existsSync(srcRoutesPath)) {
          const routesModule = await import(pathToFileURL(srcRoutesPath).href);
          const routes: string[] = routesModule.default || [];
          for (const route of routes) {
            addUrl(`${base}${route}`, today, route === '/' ? '1.00' : '0.50');
          }
        } else {
          const files = globSync('**/*.html', {
            cwd: distDir,
            ignore: ['404.html', '403.html', ...exclude],
          });

          for (const file of files) {
            const loc = `${base}/${file.replace(/index\.html$/, '').replace(/\\/g, '/')}`;
            const stats = fs.statSync(path.join(distDir, file));
            const lastmod = stats.mtime.toISOString().split('T')[0];
            const priority = file === 'index.html' ? '1.00' : '0.50';
            addUrl(loc, lastmod, priority);
          }
        }

        for (const route of additionalUrls) {
          addUrl(`${base}${route}`, today, '0.50');
        }

        const urls = urlEntries.map(({ loc, lastmod, priority }) => `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
  </url>`).join('');

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
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
