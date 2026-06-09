import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://shaan.bio';

const routes = [
  { path: '', changefreq: 'weekly', priority: 1.0 },
  { path: '#about', changefreq: 'monthly', priority: 0.8 },
  { path: '#ventures', changefreq: 'monthly', priority: 0.8 },
  { path: '#innovations', changefreq: 'monthly', priority: 0.8 },
  { path: '#works', changefreq: 'monthly', priority: 0.7 },
  { path: '#recognition', changefreq: 'monthly', priority: 0.7 },
  { path: '#contact', changefreq: 'monthly', priority: 0.9 },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${routes.map(route => `  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`).join('\n')}
</urlset>`;

const robots = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml

# Vercel deployment
Host: ${BASE_URL}`;

const distDir = path.join(process.cwd(), 'dist');
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(distDir, 'robots.txt'), robots);

console.log('Generated sitemap.xml and robots.txt');